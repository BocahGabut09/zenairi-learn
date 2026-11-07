-- Phase 5: allow the four new curriculum lessons and validate quiz result bounds.
-- Keep this RPC in sync with the application lesson IDs.
CREATE OR REPLACE FUNCTION public.complete_zenairi_lesson(
  p_lesson_id text,
  p_score integer,
  p_total_questions integer
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $function$
DECLARE
  v_user_id uuid := auth.uid();
  v_today date := (now() AT TIME ZONE 'Asia/Jakarta')::date;
  v_progress public.user_progress%ROWTYPE;
  v_attempt public.quiz_attempts%ROWTYPE;
  v_completed text[];
  v_already_done boolean;
  v_xp_gain integer;
  v_streak integer;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '28000';
  END IF;

  IF p_lesson_id IS NULL OR p_lesson_id NOT IN (
    'sapaan', 'kata-ganti', 'rumah', 'makanan',
    'kata-kerja', 'waktu-partikel', 'kalimat', 'pertanyaan',
    'keluarga-tubuh', 'alam-cuaca', 'perjalanan', 'sifat-perasaan'
  ) THEN
    RAISE EXCEPTION 'Unknown lesson' USING ERRCODE = '22023';
  END IF;

  IF p_total_questions IS NULL OR p_total_questions < 1 OR p_total_questions > 50
     OR p_score IS NULL OR p_score < 0 OR p_score > p_total_questions THEN
    RAISE EXCEPTION 'Invalid quiz result' USING ERRCODE = '22023';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtextextended(v_user_id::text, 0));

  SELECT * INTO v_progress
  FROM public.user_progress
  WHERE user_id = v_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    INSERT INTO public.user_progress
      (user_id, xp, level, streak, completed_lessons, last_activity_date)
    VALUES
      (v_user_id, 0, 1, 0, ARRAY[]::text[], NULL)
    RETURNING * INTO v_progress;
  END IF;

  v_completed := COALESCE(v_progress.completed_lessons, ARRAY[]::text[]);
  v_already_done := p_lesson_id = ANY(v_completed);
  v_xp_gain := CASE WHEN v_already_done THEN 0 ELSE 20 END;

  IF v_progress.last_activity_date = v_today THEN
    v_streak := COALESCE(v_progress.streak, 0);
  ELSIF v_progress.last_activity_date = v_today - 1 THEN
    v_streak := COALESCE(v_progress.streak, 0) + 1;
  ELSE
    v_streak := 1;
  END IF;

  IF NOT v_already_done THEN
    v_completed := array_append(v_completed, p_lesson_id);
  END IF;

  INSERT INTO public.quiz_attempts (user_id, lesson_id, score, total_questions)
  VALUES (v_user_id, p_lesson_id, p_score, p_total_questions)
  RETURNING * INTO v_attempt;

  UPDATE public.user_progress
  SET xp = COALESCE(v_progress.xp, 0) + v_xp_gain,
      level = ((COALESCE(v_progress.xp, 0) + v_xp_gain) / 100) + 1,
      streak = v_streak,
      last_activity_date = v_today,
      completed_lessons = v_completed,
      updated_at = now()
  WHERE user_id = v_user_id
  RETURNING * INTO v_progress;

  RETURN jsonb_build_object(
    'progress', to_jsonb(v_progress),
    'attempt', to_jsonb(v_attempt),
    'xp_gain', v_xp_gain
  );
END;
$function$;

REVOKE ALL ON FUNCTION public.complete_zenairi_lesson(text, integer, integer)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.complete_zenairi_lesson(text, integer, integer)
  TO authenticated;

DO $block$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'quiz_attempts_score_within_total'
      AND conrelid = 'public.quiz_attempts'::regclass
  ) THEN
    ALTER TABLE public.quiz_attempts
      ADD CONSTRAINT quiz_attempts_score_within_total
      CHECK (score >= 0 AND total_questions BETWEEN 1 AND 50 AND score <= total_questions)
      NOT VALID;
    ALTER TABLE public.quiz_attempts
      VALIDATE CONSTRAINT quiz_attempts_score_within_total;
  END IF;
END;
$block$;
