export type BindingApplyOk = {
  ok: true;
  applied: boolean;
  matchedCount: number;
  candidates: string[];
};

export type BindingApplyErr = {
  ok: false;
  applied: true;
  matchedCount: 0;
  reason: string;
};

export type BindingApplyResult = BindingApplyOk | BindingApplyErr;

export function applyBinding(params: {
  transformationCode: string;
  bindingSkills: readonly string[];
  candidateSkillIds: readonly string[];
  emptyReason: string;
  emit: (code: string, matched: number) => void;
}): BindingApplyResult {
  const {
    transformationCode,
    bindingSkills,
    candidateSkillIds,
    emptyReason,
    emit,
  } = params;

  if (bindingSkills.length === 0) {
    return {
      ok: true,
      applied: false,
      matchedCount: 0,
      candidates: [...candidateSkillIds],
    };
  }

  const bindingSet = new Set(bindingSkills);
  const filtered = candidateSkillIds.filter((id) => bindingSet.has(id));
  emit(transformationCode, filtered.length);

  if (filtered.length === 0) {
    return {
      ok: false,
      applied: true,
      matchedCount: 0,
      reason: emptyReason,
    };
  }

  return {
    ok: true,
    applied: true,
    matchedCount: filtered.length,
    candidates: filtered,
  };
}
