# 后端接口文档

本文档详细介绍了 `customs-client` 项目的后端 API 接口。

## 基础响应模型

所有API响应都遵循一个标准的包装结构。

### `ApiResponse[T]`

用于单个对象的响应。

```json
{
  "code": 200,
  "message": "Success",
  "data": T, // 具体的业务数据模型
  "timestamp": "YYYY-MM-DDTHH:MM:SS.ffffff"
}
```

### `ApiPaginatedResponse[T]`

用于分页列表的响应。

```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "items": [T], // 业务数据模型列表
    "total": 100, // 总记录数
    "page": 1,    // 当前页码
    "page_size": 10, // 每页记录数
    "pages": 10   // 总页数
  },
  "timestamp": "YYYY-MM-DDTHH:MM:SS.ffffff"
}
```

---

## 核心 API (`/api/v1`)

### 附件管理 (`/attachments`)

基地址: `/api/v1/attachments`

#### 1. 创建附件元数据

- **方法**: `POST`
- **路径**: `/`
- **作用**: 创建一个新的附件（元数据）记录。注意：这只在数据库中创建记录，文件应已存在于指定位置。
- **入参模型**: `AttachmentCreate`
- **成功响应**: `ApiResponse[Attachment]`

#### 2. 获取附件列表（分页）

- **方法**: `GET`
- **路径**: `/`
- **作用**: 获取附件元数据列表。
- **查询参数**:
    - `skip`: `int` (默认 0) - 跳过的记录数
    - `limit`: `int` (默认 10) - 每页记录数
- **成功响应**: `ApiPaginatedResponse[Attachment]`

#### 3. 获取单个附件

- **方法**: `GET`
- **路径**: `/{attachment_id}`
- **作用**: 根据ID获取附件元数据。
- **路径参数**:
    - `attachment_id`: `int`
- **成功响应**: `ApiResponse[Attachment]`

#### 4. 更新附件

- **方法**: `PUT`
- **路径**: `/{attachment_id}`
- **作用**: 更新附件元数据。
- **路径参数**:
    - `attachment_id`: `int`
- **入参模型**: `AttachmentUpdate`
- **成功响应**: `ApiResponse[Attachment]`

#### 5. 删除附件

- **方法**: `DELETE`
- **路径**: `/{attachment_id}`
- **作用**: 删除附件元数据。警告：这只删除数据库记录，不会删除物理文件。
- **路径参数**:
    - `attachment_id`: `int`
- **成功响应**: `ApiResponse[Attachment]`

---

### 任务管理 (`/tasks`)

基地址: `/api/v1/tasks`

#### 1. 创建任务

- **方法**: `POST`
- **路径**: `/`
- **作用**: 创建一个新任务。
- **入参模型**: `TaskCreate`
- **成功响应**: `ApiResponse[Task]`

#### 2. 获取任务列表（分页）

- **方法**: `GET`
- **路径**: `/`
- **作用**: 获取任务列表。
- **查询参数**:
    - `skip`: `int` (默认 0)
    - `limit`: `int` (默认 10)
- **成功响应**: `ApiPaginatedResponse[Task]`

#### 3. 获取单个任务

- **方法**: `GET`
- **路径**: `/{task_id}`
- **作用**: 根据ID获取任务详情及其关联的日志。
- **路径参数**:
    - `task_id`: `int`
- **成功响应**: `ApiResponse[Task]`

#### 4. 更新任务

- **方法**: `PUT`
- **路径**: `/{task_id}`
- **作用**: 更新任务信息。
- **路径参数**:
    - `task_id`: `int`
- **入参模型**: `TaskUpdate`
- **成功响应**: `ApiResponse[Task]`

#### 5. 删除任务

- **方法**: `DELETE`
- **路径**: `/{task_id}`
- **作用**: 删除一个任务。
- **路径参数**:
    - `task_id`: `int`
- **成功响应**: `ApiResponse[Task]`

---

### 用户管理 (`/users`)

基地址: `/api/v1/users`

#### 1. 创建用户

- **方法**: `POST`
- **路径**: `/`
- **作用**: 创建一个新用户。
- **入参模型**: `UserCreate`
- **成功响应**: `ApiResponse[User]`

#### 2. 获取用户列表（分页）

- **方法**: `GET`
- **路径**: `/`
- **作用**: 获取用户列表。
- **查询参数**:
    - `skip`: `int` (默认 0)
    - `limit`: `int` (默认 10)
- **成功响应**: `ApiPaginatedResponse[User]`

#### 3. 获取单个用户

- **方法**: `GET`
- **路径**: `/{user_id}`
- **作用**: 根据ID获取用户信息。
- **路径参数**:
    - `user_id`: `int`
- **成功响应**: `ApiResponse[User]`

#### 4. 更新用户

- **方法**: `PUT`
- **路径**: `/{user_id}`
- **作用**: 更新用户信息。
- **路径参数**:
    - `user_id`: `int`
- **入参模型**: `UserUpdate`
- **成功响应**: `ApiResponse[User]`

#### 5. 删除用户

- **方法**: `DELETE`
- **路径**: `/{user_id}`
- **作用**: 删除一个用户。
- **路径参数**:
    - `user_id`: `int`
- **成功响应**: `ApiResponse[User]`

---

## 业务 API - 中国（上海）国际贸易单一窗口 (`/sw`)

### 海关税费单 (`/customs-tax`)

基地址: `/sw/api/v1/customs-tax`

#### 1. 创建海关税费单

- **方法**: `POST`
- **路径**: `/`
- **作用**: 创建新的海关税费单。
- **入参模型**: `CustomsTaxCreate`
- **成功响应**: `ApiResponse[CustomsTaxSchema]`

#### 2. 获取海关税费单列表（分页）

- **方法**: `GET`
- **路径**: `/`
- **作用**: 获取海关税费单列表。
- **查询参数**:
    - `skip`: `int` (默认 0)
    - `limit`: `int` (默认 10)
- **成功响应**: `ApiPaginatedResponse[CustomsTaxSchema]`

#### 3. 根据报关单号获取税费单

- **方法**: `GET`
- **路径**: `/by_entry_id/{entry_id}`
- **作用**: 根据关联的报关单编号(EntryID)获取所有税费单。
- **路径参数**:
    - `entry_id`: `str`
- **成功响应**: `ApiResponse[List[CustomsTaxSchema]]`

#### 4. 根据税票号获取税费单

- **方法**: `GET`
- **路径**: `/by_taxvou_no/{taxvou_no}`
- **作用**: 根据税票号(taxvou_no)获取单个税费单。
- **路径参数**:
    - `taxvou_no`: `str`
- **成功响应**: `ApiResponse[CustomsTaxSchema]`

#### 5. 获取单个税费单

- **方法**: `GET`
- **路径**: `/{sw_tax_id}`
- **作用**: 根据 sw_tax_id (电子税费单ID) 获取单个税费单。
- **路径参数**:
    - `sw_tax_id`: `str`
- **成功响应**: `ApiResponse[CustomsTaxSchema]`

#### 6. 更新税费单

- **方法**: `PUT`
- **路径**: `/{sw_tax_id}`
- **作用**: 更新海关税费单。
- **路径参数**:
    - `sw_tax_id`: `str`
- **入参模型**: `CustomsTaxUpdate`
- **成功响应**: `ApiResponse[CustomsTaxSchema]`

#### 7. 删除税费单

- **方法**: `DELETE`
- **路径**: `/{sw_tax_id}`
- **作用**: 删除海关税费单。
- **路径参数**:
    - `sw_tax_id`: `str`
- **成功响应**: `ApiResponse[CustomsTaxSchema]`

---

### 税费单附件 (`/customs-tax-attachment`)

基地址: `/sw/api/v1/customs-tax-attachment`

#### 1. 创建税单附件

- **方法**: `POST`
- **路径**: `/`
- **作用**: 创建新的税单附件。
- **入参模型**: `CustomsTaxAttachmentCreate`
- **成功响应**: `ApiResponse[CustomsTaxAttachment]`

#### 2. 获取税单附件列表（分页）

- **方法**: `GET`
- **路径**: `/`
- **作用**: 获取税单附件列表。
- **查询参数**:
    - `skip`: `int` (默认 0)
    - `limit`: `int` (默认 10)
- **成功响应**: `ApiPaginatedResponse[CustomsTaxAttachment]`

#### 3. 获取单个税单附件

- **方法**: `GET`
- **路径**: `/{tax_head_seq_no}/{tax_type}/{file_type}`
- **作用**: 根据3个主键获取单个附件详情。
- **路径参数**:
    - `tax_head_seq_no`: `str` (税单表头序号)
    - `tax_type`: `str` (税种代码)
    - `file_type`: `str` (文件业务类型)
- **成功响应**: `ApiResponse[CustomsTaxAttachment]`

#### 4. 更新税单附件

- **方法**: `PUT`
- **路径**: `/{tax_head_seq_no}/{tax_type}/{file_type}`
- **作用**: 更新税单附件信息。
- **路径参数**:
    - `tax_head_seq_no`: `str`
    - `tax_type`: `str`
    - `file_type`: `str`
- **入参模型**: `CustomsTaxAttachmentUpdate`
- **成功响应**: `ApiResponse[CustomsTaxAttachment]`

#### 5. 删除税单附件

- **方法**: `DELETE`
- **路径**: `/{tax_head_seq_no}/{tax_type}/{file_type}`
- **作用**: 删除税单附件。
- **路径参数**:
    - `tax_head_seq_no`: `str`
    - `tax_type`: `str`
    - `file_type`: `str`
- **成功响应**: `ApiResponse[CustomsTaxAttachment]`

---

### 税费单货物项 (`/customs-tax-goods`)

基地址: `/sw/api/v1/customs-tax-goods`

#### 1. 创建税单货物项

- **方法**: `POST`
- **路径**: `/`
- **作用**: 创建新的税单货物项。
- **入参模型**: `CustomsTaxGoodsCreate`
- **成功响应**: `ApiResponse[CustomsTaxGoodsSchema]`

#### 2. 获取税单货物项列表（分页）

- **方法**: `GET`
- **路径**: `/`
- **作用**: 获取所有税单的货物项列表。
- **查询参数**:
    - `skip`: `int` (默认 0)
    - `limit`: `int` (默认 10)
- **成功响应**: `ApiPaginatedResponse[CustomsTaxGoodsSchema]`

#### 3. 根据税单表头序号获取货物项

- **方法**: `GET`
- **路径**: `/by-tax-head/{tax_head_seq_no}`
- **作用**: 根据 "税单表头序号" (tax_head_seq_no) 获取所有货物项。
- **路径参数**:
    - `tax_head_seq_no`: `str`
- **成功响应**: `ApiResponse[List[CustomsTaxGoodsSchema]]`

#### 4. 获取单个货物项

- **方法**: `GET`
- **路径**: `/by-tax-head/{tax_head_seq_no}/goods/{goods_no}`
- **作用**: 根据复合主键获取单个货物项。
- **路径参数**:
    - `tax_head_seq_no`: `str`
    - `goods_no`: `int`
- **成功响应**: `ApiResponse[CustomsTaxGoodsSchema]`

#### 5. 更新货物项

- **方法**: `PUT`
- **路径**: `/by-tax-head/{tax_head_seq_no}/goods/{goods_no}`
- **作用**: 根据复合主键更新单个货物项。
- **路径参数**:
    - `tax_head_seq_no`: `str`
    - `goods_no`: `int`
- **入参模型**: `CustomsTaxGoodsUpdate`
- **成功响应**: `ApiResponse[CustomsTaxGoodsSchema]`

#### 6. 删除货物项

- **方法**: `DELETE`
- **路径**: `/by-tax-head/{tax_head_seq_no}/goods/{goods_no}`
- **作用**: 根据复合主键删除单个货物项。
- **路径参数**:
    - `tax_head_seq_no`: `str`
    - `goods_no`: `int`
- **成功响应**: `ApiResponse[CustomsTaxGoodsSchema]`

---

### 报关单附件 (`/declaration-attachment`)

基地址: `/sw/api/v1/declaration-attachment`

#### 1. 创建报关单附件

- **方法**: `POST`
- **路径**: `/`
- **作用**: 创建新的报关单附件。
- **入参模型**: `DeclarationAttachmentCreate`
- **成功响应**: `ApiResponse[DeclarationAttachment]`

#### 2. 获取报关单附件列表（分页）

- **方法**: `GET`
- **路径**: `/`
- **作用**: 获取报关单附件列表。
- **查询参数**:
    - `skip`: `int` (默认 0)
    - `limit`: `int` (默认 10)
- **成功响应**: `ApiPaginatedResponse[DeclarationAttachment]`

#### 3. 获取单个报关单附件

- **方法**: `GET`
- **路径**: `/{cus_ciq_no}/{filetype}`
- **作用**: 根据 统一编号 + 文件类型 获取单个附件信息。
- **路径参数**:
    - `cus_ciq_no`: `str` (统一编号)
    - `filetype`: `str` (文件类型)
- **成功响应**: `ApiResponse[DeclarationAttachment]`

#### 4. 更新报关单附件

- **方法**: `PUT`
- **路径**: `/{cus_ciq_no}/{filetype}`
- **作用**: 更新报关单附件信息。
- **路径参数**:
    - `cus_ciq_no`: `str`
    - `filetype`: `str`
- **入参模型**: `DeclarationAttachmentUpdate`
- **成功响应**: `ApiResponse[DeclarationAttachment]`

#### 5. 删除报关单附件

- **方法**: `DELETE`
- **路径**: `/{cus_ciq_no}/{filetype}`
- **作用**: 删除报关单附件。
- **路径参数**:
    - `cus_ciq_no`: `str`
    - `filetype`: `str`
- **成功响应**: `ApiResponse[DeclarationAttachment]`

---

### 报关单 (`/declarations`)

基地址: `/sw/api/v1/declarations`

#### 1. 创建报关单

- **方法**: `POST`
- **路径**: `/`
- **作用**: 创建新报关单。
- **入参模型**: `CustomsDeclarationCreate`
- **成功响应**: `ApiResponse[CustomsDeclarationSchema]`

#### 2. 获取报关单列表（分页）

- **方法**: `GET`
- **路径**: `/`
- **作用**: 获取报关单列表。
- **查询参数**:
    - `skip`: `int` (默认 0)
    - `limit`: `int` (默认 10)
- **成功响应**: `ApiPaginatedResponse[CustomsDeclarationSchema]`

#### 3. 获取单个报关单

- **方法**: `GET`
- **路径**: `/{cus_ciq_no}`
- **作用**: 根据 CusCiqNo (海关/商检编号) 获取报关单。
- **路径参数**:
    - `cus_ciq_no`: `str`
- **成功响应**: `ApiResponse[CustomsDeclarationSchema]`

#### 4. 更新报关单

- **方法**: `PUT`
- **路径**: `/{cus_ciq_no}`
- **作用**: 更新报关单。
- **路径参数**:
    - `cus_ciq_no`: `str`
- **入参模型**: `CustomsDeclarationUpdate`
- **成功响应**: `ApiResponse[CustomsDeclarationSchema]`

#### 5. 删除报关单

- **方法**: `DELETE`
- **路径**: `/{cus_ciq_no}`
- **作用**: 删除报关单。
- **路径参数**:
    - `cus_ciq_no`: `str`
- **成功响应**: `ApiResponse[CustomsDeclarationSchema]`

---

## 模型定义 (Schemas)

### Attachment

| 字段名 | 类型 | 描述 |
|---|---|---|
| `id` | `int` | 附件ID |
| `filename` | `str` | 文件名 |
| `file_path` | `str` | 文件路径 |
| `mimetype` | `Optional[str]` | Mime类型 |
| `size` | `int` | 文件大小(字节) |
| `storage` | `str` | 存储方式 (e.g., 'local', 'ftp') |
| `created_at` | `datetime` | 创建时间 |
| `updated_at` | `Optional[datetime]` | 更新时间 |

### Task

| 字段名 | 类型 | 描述 |
|---|---|---|
| `id` | `int` | 任务ID |
| `task_type` | `str` | 任务类型 |
| `task_params` | `Optional[str]` | 任务参数 (JSON字符串) |
| `priority` | `int` | 优先级 |
| `status` | `TaskStatus` (Enum) | 任务状态 |
| `retry_count` | `int` | 重试次数 |
| `max_retries` | `int` | 最大重试次数 |
| `created_at` | `datetime` | 创建时间 |
| `updated_at` | `datetime` | 更新时间 |
| `last_run_at` | `Optional[datetime]` | 上次运行时间 |
| `logs` | `List[TaskLog]` | 关联的任务日志 |

### User

| 字段名 | 类型 | 描述 |
|---|---|---|
| `id` | `int` | 用户ID |
| `email` | `EmailStr` | 邮箱 |
| `username` | `str` | 用户名 |
| `is_active` | `bool` | 是否激活 |
| `created_at` | `datetime` | 创建时间 |
| `updated_at` | `Optional[datetime]` | 更新时间 |

### CustomsTaxSchema

(字段众多，此处列出关键字段，详细请看代码 `customs_tax_schema.py`)

| 字段名 (snake_case) | 别名 (camelCase) | 类型 | 描述 |
|---|---|---|---|
| `tax_head_seq_no` | `taxHeadSeqNo` | `str` | 税单表头序号 |
| `sw_tax_id` | `swTaxId` | `str` | 电子税费单ID |
| `entry_id` | `entryId` | `str` | 报关单编号 |
| `taxvou_no` | `taxvouNo` | `str` | 税票号 |
| `tra_amt` | `traAmt` | `float` | 应缴金额 |
| `trans_status_name` | `transStatusName` | `str` | 支付状态 |
| `limit_date` | `limitDateStr` | `date` | 缴款期限 |

### CustomsTaxAttachment

| 字段名 | 类型 | 描述 |
|---|---|---|
| `tax_head_seq_no` | `str` | 税单表头序号 (主键) |
| `tax_type` | `str` | 税种代码 (主键) |
| `file_type` | `str` | 文件业务类型 (主键) |
| `entry_id` | `Optional[str]` | 报关单号 |
| `storage` | `str` | 存储方式 |
| `filename` | `str` | 文件名 |
| `file_path` | `str` | 文件路径 |
| `size` | `int` | 文件大小 |

### CustomsTaxGoodsSchema

| 字段名 (snake_case) | 别名 (camelCase) | 类型 | 描述 |
|---|---|---|---|
| `tax_head_seq_no` | `taxHeadSeqNo` | `str` | 税单表头序号 (主键) |
| `goods_no` | `goodsNo` | `int` | 商品序号 (主键) |
| `entry_id` | `entryId` | `str` | 报关单号 |
| `code_ts` | `codeTS` | `str` | 商品编码(HS) |
| `goods_name` | `goodsName` | `str` | 商品名称 |
| `duty_value` | `dutyValue` | `float` | 完税价格 |
| `tax` | `tax` | `float` | 税额 |

### DeclarationAttachment

| 字段名 | 类型 | 描述 |
|---|---|---|
| `cus_ciq_no` | `str` | 统一编号 (主键) |
| `filetype` | `str` | 文件类型 (主键) |
| `entry_id` | `Optional[str]` | 报关单号 |
| `storage` | `str` | 存储方式 |
| `filename` | `str` | 文件名 |
| `file_path` | `str` | 文件路径 |
| `size` | `int` | 文件大小 |

### CustomsDeclarationSchema

(字段众多，此处列出关键字段，详细请看代码 `declaration_schema.py`)

| 字段名 (snake_case) | 别名 (camelCase) | 类型 | 描述 |
|---|---|---|---|
| `cus_ciq_no` | `cusCiqNo` | `str` | 海关/商检编号 |
| `entry_id` | `entryId` | `str` | 报关单号 |
| `cus_dec_status_name`| `cusDecStatusName` | `str` | 海关状态 |
| `agent_name` | `agentName` | `str` | 申报单位 |
| `owner_name` | `ownerName` | `str` | 境内货主 |
| `ie_date` | `iEDate` | `date` | 进出口日期 |
| `d_date` | `dDate` | `date` | 申报日期 |
