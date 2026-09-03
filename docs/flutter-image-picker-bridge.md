# Flutter 图片选择桥接

意见反馈页优先调用 Flutter InAppWebView 的 `yomiPickImages` handler；Web 环境自动回退到原生多选文件框。

请求参数：

```json
{
  "multiple": true,
  "maxCount": 4,
  "accept": "image/*"
}
```

返回值可以是图片数组，也可以是 `{ "images": [...] }`。单张图片支持以下格式：

```json
{
  "id": "optional-id",
  "name": "photo.jpg",
  "base64": "...",
  "mimeType": "image/jpeg"
}
```

也支持直接返回 data URL，或返回包含 `url`、`uri`、`path` 任一字段的对象。为了确保 WebView 能预览，Flutter 端推荐返回 data URL 或 base64。
