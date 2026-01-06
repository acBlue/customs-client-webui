// src/types/api.ts

/**
 * Base API response structure for a single item.
 */
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  timestamp: string; // ISO 8601 format date string
}

/**
 * Pagination data structure.
 */
export interface PaginationData<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

/**
 * Base API response structure for paginated lists.
 */
export interface ApiPaginatedResponse<T> {
  code: number;
  message: string;
  data: PaginationData<T>;
  timestamp: string; // ISO 8601 format date string
}

// --- Core API Schemas ---

export interface Attachment { 
  id: number;
  filename: string;
  file_path: string;
  mimetype?: string | null;

  size: number;
  storage: string;
  created_at: string; // datetime
  updated_at?: string | null; // datetime
}

// NOTE: Assuming enum values for TaskStatus. This should be confirmed with the backend spec.
export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'retrying';

// NOTE: Assuming TaskLog structure as it's not defined in backend.md.
export interface TaskLog {
  id: number;
  level: string;
  message: string;
  created_at: string;
}

export interface Task {
  id: number;
  task_type: string;
  task_params?: string | null; // JSON string
  priority: number;
  status: TaskStatus;
  retry_count: number;
  max_retries: number;
  created_at: string; // datetime
  updated_at: string; // datetime
  last_run_at?: string | null; // datetime
  logs: TaskLog[];
}

export interface User {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  created_at: string; // datetime
  updated_at?: string | null; // datetime
}

// --- Business API Schemas ---

export interface CustomsDeclarationSchema {
  cusCiqNo: string;
  entryId: string;
  cusDecStatusName: string;
  agentName: string;
  ownerName: string;
  iEDate: string; // date
  dDate: string; // date
  // NOTE: Other fields exist but are not listed in the markdown summary
}

export interface DeclarationAttachment {
  cus_ciq_no: string;
  filetype: string;
  entry_id?: string | null;
  storage: string;
  filename: string;
  file_path: string;
  size: number;
}

export interface CustomsTaxSchema {
  taxHeadSeqNo: string;
  swTaxId: string;
  entryId: string;
  taxvouNo: string;
  traAmt: number; // float
  transStatusName: string;
  limitDateStr: string; // date
  // NOTE: Other fields exist but are not listed in the markdown summary
}

export interface CustomsTaxAttachment {
  tax_head_seq_no: string;
  tax_type: string;
  file_type: string;
  entry_id?: string | null;
  storage: string;
  filename: string;
  file_path: string;
  size: number;
}

export interface CustomsTaxGoodsSchema {
  taxHeadSeqNo: string;
  goodsNo: number;
  entryId: string;
  codeTS: string;
  goodsName: string;
  dutyValue: number; // float
  tax: number; // float
}

// --- API Input Schemas (Create/Update) ---
// NOTE: These are based on the API endpoints but not explicitly defined in the Schemas section.
// They are here for convenience and might need adjustments based on actual backend validation rules.

export type AttachmentCreate = Omit<Attachment, 'id' | 'created_at' | 'updated_at'>;
export type AttachmentUpdate = Partial<AttachmentCreate>;

export type TaskCreate = Pick<Task, 'task_type' | 'task_params' | 'priority' | 'max_retries'>;
export type TaskUpdate = Partial<Pick<Task, 'priority' | 'status'>>;

// Assuming password is required on create.
export type UserCreate = Pick<User, 'email' | 'username'> & { password: string };
export type UserUpdate = Partial<Pick<User, 'username' | 'is_active'>>;

export type CustomsDeclarationCreate = CustomsDeclarationSchema;
export type CustomsDeclarationUpdate = Partial<CustomsDeclarationCreate>;

export type DeclarationAttachmentCreate = DeclarationAttachment;
export type DeclarationAttachmentUpdate = Partial<DeclarationAttachmentCreate>;

export type CustomsTaxCreate = CustomsTaxSchema;
export type CustomsTaxUpdate = Partial<CustomsTaxCreate>;

export type CustomsTaxAttachmentCreate = CustomsTaxAttachment;
export type CustomsTaxAttachmentUpdate = Partial<CustomsTaxAttachmentCreate>;

export type CustomsTaxGoodsCreate = CustomsTaxGoodsSchema;
export type CustomsTaxGoodsUpdate = Partial<CustomsTaxGoodsCreate>;
