# EverStarine · 纸间与回声

独立的个人阅读、思考与艺术交流主页，以冷白纸感、钴蓝线条、宋体标题与原创几何插画呈现。

站点：https://everstarine-arts.pretty-grass-6439.chatgpt.site/

GitHub Pages：https://everstarine.github.io/arts-homepage/

## 页面与内容

- `#/`：序页与栏目入口。
- `#/reading`：读书分享，分类、搜索与排序。
- `#/thoughts`：思考随笔，分类、搜索与排序。
- `#/gallery`：画廊，分类、搜索、展墙和索引视图、作品详情。
- `#/music`：音乐，分类、搜索、排序与聆听笔记；填入合法音频地址后可在详情中播放。
- `#/exchange`：来信墙、本地草稿与预览。
- `#/about`：个人介绍与本站说明。

具体书籍、随笔、图片、音乐、来信、个人介绍均留空。没有虚构作品、读书经历、访客留言或引用。所有插画与图标为本站原创 SVG/CSS，无外部素材、追踪脚本或字体服务依赖。

## 填入真实内容

编辑 `dist/content.js`，页面自动读取以下集合：

- `reading`：`{ title, author, category, date, description, body }`，category 为文学、思想、艺术或其他。
- `thoughts`：`{ title, category, date, description, body }`，category 为读书札记、日常思考或艺术随想。
- `gallery`：`{ title, artist, category, date, src, alt, description, body }`，category 为绘画、摄影或其他。
- `music`：`{ title, artist, category, date, description, body, audio }`，category 为古典、原声或其他。audio 选填，仅添加有权使用的音频。
- `messages`：`{ name, message, date }`，用于站主手动维护的公开来信。
- `profile.bio`：个人介绍。
- 日期统一采用 `YYYY-MM-DD`。图片/音频可以使用本站相对路径或 HTTPS 地址。

交流表单使用本站独立的浏览器存储键；草稿仅存于当前浏览器，不上传、不发送、不公开。站主无法在服务器接收这些草稿。真正公开投稿、审核、持久化数据库留待后续实现。

`relatedSites.enabled` 为 `false`，`items` 为空；未来可用 `{ title, url }` 配置关联站点。本版本未启用任何互链。与学术、游戏主页的源码、资源、托管身份及 GitHub 仓库互相独立。

## 本地预览

运行 `node preview.mjs`，打开 http://127.0.0.1:4185/ 。网站无需依赖安装或构建。

`dist/` 是可直接托管的完整静态网站。维护脚本、核验报告和恢复包保存在源码目录之外。
