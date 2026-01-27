export type Id = string;
export type ISODateTime = string;
export type SHA256 = string;

export type Provenance = {
  sourceType: string;
  sourceRef: string;
  actorId?: Id;
  runnerId?: Id;
  taskId?: Id;
  notes?: string;
};

export type EntityMeta = {
  id: Id;
  createdAt: ISODateTime;
  updatedAt?: ISODateTime;
  provenance: Provenance;
};
