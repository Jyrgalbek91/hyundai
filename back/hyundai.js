var app;(()=>{"use strict";var e={806:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(252)),n=s(r(174)),o=s(r(898)),i=s(r(577)),u=s(r(376)),l=s(r(218)),d=s(r(260)),c=s(r(978)),f=s(r(251)),p=s(r(652)),_=r(664),m=s(r(799)),g=(0,a.default)();(async()=>{try{const e=d.default.PORT;g.use((0,i.default)(f.default)),g.use(p.default),g.use(c.default),g.use(a.default.json()),g.use((0,n.default)()),g.use((0,o.default)()),g.use((0,u.default)()),g.use(m.default),g.use("/",a.default.static("public")),g.use("/",l.default),g.listen(e,(async()=>{console.log("Application listening on port: ",e),await(0,_.connectionCheck)()}))}catch(e){console.log("error startServer: ",e.message)}})()},945:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(122));t.default=a.default},235:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(460)),n=s(r(416)),o=s(r(716)),i=s(r(946)),u=s(r(260)),l=s(r(560)),d=u.default.FILE_POST_PATH;t.default=new class{async getPostByIdController(e,t){try{const{id:r}=e.query,s=Number(r),n=await a.default.getPostById(s);return n?t.status(200).json(n):t.status(404).json({message:"Новости или акции не найдены"})}catch(e){return console.error("error getNewsController: ",e.message),t.status(500).json({message:"Internal Server Error"})}}async getAllPostsController(e,t){try{const{id:r}=e.params,{page:s=1,offset:n=12}=e.query,o=Number(r),i=Number(s),u=Number(n);if(isNaN(i)||isNaN(u))return t.status(400).json({message:"Некорректные параметры"});const l=await a.default.getAllPosts(o,i,u);return l?t.status(200).json(l):t.status(404).json({message:"Новости не найдены"})}catch(e){return console.error("error getAllPostsController: ",e.message),t.status(500).json({message:"Internal Server Error"})}}async createController(e,t){var r;try{if(!(0,n.default)(e.body,o.default.postSchema))return t.status(400).json({message:"Неверный формат"});const{id_type:s,title:u,description:l,images:c}=e.body;if(!Number(null===(r=e.user)||void 0===r?void 0:r.id))return t.status(404).json({message:"У вас нет доступа"});const f=[];if(e.files&&e.files.images){const r=Array.isArray(e.files.images)?e.files.images:[e.files.images];for(const e of r){const r=await i.default.saveFile({path:d,fileName:e.name,sampleFile:e,type:"image"});if(r.error)return t.status(400).json({message:"Ошибка загрузки файла"});f.push(r.dbFileName)}}const p=await a.default.create(s,u,l,f.length>0?f:c);return p?t.status(200).json({message:"Пост успешно создан",result:p}):t.status(404).json({message:"Ошибка создания поста"})}catch(e){return console.error("Ошибка в createController: ",e.message),t.status(500).json({message:"Ошибка сервера"})}}async showImage(e,t){try{const r=e.params.fileName,s=d+r,a=await l.default.exists(s);return console.log(await l.default.exists(s)),a?t.sendFile(s):t.status(400).json({message:"Файл не найден"})}catch(e){return console.log("error showFile: ",e.message),t.status(500).json({message:"Ошибка сервера"})}}async deletePost(e,t){const{id_post:r}=e.params;return isNaN(Number(r))?t.status(400).json({message:"Неверный формат ID"}):await a.default.deletePostById(Number(r))?t.status(200).json({message:"Успешно удалено"}):t.status(500).json({message:"Ошибка при удалении"})}async updatePost(e,t){try{const{id_post:r}=e.params,s=e.body;if(isNaN(Number(r)))return t.status(400).json({message:"Неверный формат ID"});"string"==typeof s.images_to_delete&&(s.images_to_delete=s.images_to_delete.split(",").map((e=>Number(e.trim()))).filter((e=>!isNaN(e))));const n=[];if(e.files&&e.files.images){const r=Array.isArray(e.files.images)?e.files.images:[e.files.images];for(const e of r){const r=await i.default.saveFile({path:d,fileName:e.name,sampleFile:e,type:"image"});if(r.error)return t.status(400).json({message:"Ошибка загрузки файла"});n.push(r.dbFileName)}}return s.images=n.map((e=>({image_name:e}))),await a.default.updatePostById(Number(r),s)?t.status(200).json({message:"Успешно обновлено"}):t.status(500).json({message:"Ошибка обновления"})}catch(e){return console.error("Error in updatePost:",e),t.status(500).json({message:"Internal server error"})}}async similarArticlesController(e,t){try{const{title:r}=e.query,s=await a.default.similarArticles(String(r));return s?t.status(200).json({message:"Успешно",data:s}):t.status(400).json({message:"Ошибка"})}catch(e){return console.log("error similarArticlesController: ",e.message),!1}}}},122:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(252)),n=s(r(235)),o=s(r(780)),i=a.default.Router();i.get("/get/id",n.default.getPostByIdController),i.post("/create",o.default.isAdminToken,n.default.createController),i.get("/similar",n.default.similarArticlesController),i.get("/get/:id",n.default.getAllPostsController),i.get("/image_file/show/:fileName",n.default.showImage),i.delete("/delete/:id_post",n.default.deletePost),i.put("/update/:id_post",n.default.updatePost),t.default=i},716:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default={postSchema:{type:"object",properties:{id_type:{type:"string",minLength:1,required:!0},title:{type:"string",minLength:6},description:{type:"string",minLength:6},images:{type:"array",items:{type:"string"}}}}}},460:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(928)),n=s(r(260)),o=s(r(664)),i=s(r(896)),u=n.default.ALLOW_HOST,l=n.default.FILE_POST_URL,d=n.default.FILE_POST_PATH,c={getPostById:async function(e){try{const{error:t,rows:r}=await o.default.query("SELECT \n         p.id AS post_id, \n         p.id_type, \n         pt.type_name,\n         p.title, \n         p.description, \n         p.date, \n         p.updated_at, \n         p.active, \n         g.id_image, \n         g.image_name \n       FROM post p \n       JOIN image g ON p.id = g.id_post\n       JOIN post_type pt ON pt.id_post_type = p.id_type\n       WHERE p.id = $1;",[e]);return!t&&0!==r.length&&{id:r[0].post_id,id_type:r[0].id_type,type_name:r[0].type_name,title:r[0].title,description:r[0].description,date:r[0].date,updated_at:r[0].updated_at,active:r[0].active,images:r.map((e=>({id_image:e.id_image,image_name:e.image_name?`${u}${l}image-${e.image_name}`:null})))}}catch(e){return console.log("error getPostById: ",e.message),!1}},getAllPosts:async function(e,t,r){try{const s=r,a=(t-1)*r,{error:n,rows:i}=await o.default.query("SELECT \n          p.id, \n          p.id_type, \n          pt.type_name,\n          p.title, \n          p.description, \n          p.\"date\", \n          p.updated_at, \n          p.active,\n          ARRAY_AGG(JSON_BUILD_OBJECT('id', i.id_image, 'image_name', i.image_name)) AS images\n        FROM post p\n        JOIN image i ON i.id_post = p.id\n        JOIN post_type pt ON pt.id_post_type = p.id_type\n        WHERE p.active = true\n          AND p.id_type = $1\n        GROUP BY p.id, p.id_type, pt.type_name, p.title, p.description, p.\"date\", p.updated_at, p.active\n        ORDER BY p.updated_at DESC\n        LIMIT $2 OFFSET $3;",[e,s,a]);return!n&&i.map((e=>Object.assign(Object.assign({},e),{images:e.images.map((e=>Object.assign(Object.assign({},e),{image_name:e.image_name?`${u}${l}image-${e.image_name}`:null})))})))}catch(e){return console.log("error getAllPosts: ",e.message),!1}},create:async function(e,t,r,s){try{const a="",{error:n,rows:i}=await o.default.query("CALL p_insert_post($1, $2, $3, $4, $5);",[e,t,r,s,a]);return n?(console.error("Error while inserting post:",n),!1):i}catch(e){return console.error("Error in create:",e.message),!1}},deletePostById:async function(e){try{const{rows:t}=await o.default.query("SELECT image_name FROM image WHERE id_post = $1",[e]);return t.length>0&&(t.forEach((e=>{const t=a.default.join(`${d}image-${e.image_name}`);i.default.existsSync(t)&&i.default.unlinkSync(t)})),await o.default.query("DELETE FROM image WHERE id_post = $1",[e])),await o.default.query("DELETE FROM post WHERE id = $1",[e]),!0}catch(e){return console.error("Error deleting post and images:",e),!1}},updatePostById:async function(e,t){try{const{title:r,description:s,id_type:n,images_to_delete:u,images:l}=t,c=!0;let f=[],p=[];if(void 0!==r&&(f.push(`title = $${p.length+1}`),p.push(r)),void 0!==s&&(f.push(`description = $${p.length+1}`),p.push(s)),void 0!==n&&(f.push(`id_type = $${p.length+1}`),p.push(n)),f.push(`active = $${p.length+1}`),p.push(c),f.push("updated_at = NOW()"),f.length>0&&await o.default.query(`UPDATE post SET ${f.join(", ")} WHERE id = $${p.length+1}`,[...p,e]),u&&u.length>0){const{rows:e}=await o.default.query("SELECT image_name FROM image WHERE id_image = ANY($1)",[u]);e.forEach((e=>{const t=a.default.join(`${d}image-${e.image_name}`);i.default.existsSync(t)&&i.default.unlinkSync(t)})),await o.default.query("DELETE FROM image WHERE id_image = ANY($1)",[u])}if(l&&l.length>0){const t=l.map((t=>o.default.query("INSERT INTO image (id_post, image_name) VALUES ($1, $2)",[e,t.image_name])));await Promise.all(t)}return!0}catch(e){return console.error("Error updating post and images:",e),!1}},similarArticles:async function(e){try{const t=e.replace(/[^\w\sа-яА-Я]/g,"").split(" ").filter((e=>e.length>3)).join(" | "),{rows:r}=await o.default.query("SELECT p.id,\n              p.id_type,\n              p.title,\n              p.description,\n              p.\"date\",\n              p.updated_at,\n              p.active,\n              ARRAY_AGG(JSON_BUILD_OBJECT('id', i.id_image, 'image_name', i.image_name)) AS images\n       FROM post p\n       JOIN image i ON p.id = i.id_post\n       WHERE p.id_type = 1 \n         AND p.tsv_content @@ to_tsquery('russian', $1)\n       GROUP BY p.id, p.id_type, p.title, p.description, p.\"date\", p.updated_at, p.active\n       ORDER BY ts_rank(p.tsv_content, to_tsquery('russian', $1)) DESC\n       LIMIT 3;",[t]);return r.map((e=>Object.assign(Object.assign({},e),{images:e.images.map((e=>Object.assign(Object.assign({},e),{image_name:e.image_name?`${u}${l}image-${e.image_name}`:null})))})))}catch(e){return console.error("Error in similarArticles:",e.message),[]}}};t.default=c},799:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=r(252),n=s(r(684)),o=s(r(945)),i=s(r(636)),u=(0,a.Router)().use("/user",n.default).use("/post",o.default).use("/storage",i.default);u.use(((e,t)=>{t.status(404).json({error:"API not found"})})),t.default=(0,a.Router)().use("/hyundai/api",u)},780:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=r(572),n=s(r(260)),o=s(r(481)),i=(e,t)=>(0,a.sendError)(e,t,!1,401),u={isAdminToken:async(e,t,r)=>await(async(e,t,r,s)=>{try{const a=e.headers.authorization;if("development"===n.default.NODE_ENV&&console.log("token: ",a),!a)return i(t,e.t("token.notFound"));const u=o.default.getTokenData(a);if(!u)return i(t,e.t("token.invalid"));const l=Date.now();if("development"===n.default.NODE_ENV&&(console.log(Object.assign({},u)),console.log("Token expiration: ",new Date(u.exp)),console.log("Current timestamp: ",new Date(l)),console.log("Is token valid: ",u.exp>l)),u.exp<=l)return i(t,e.t("token.expired"));const d=u.r.map((e=>e.id_role));return await(async(e,t)=>{const r=new Set(e);for(let e of t)if(r.has(e))return!0;return!1})(d,s)?(e.user=u,r()):i(t,e.t("token.permission"))}catch(r){return console.error("CheckToken error:",r.message),i(t,e.t("token.invalid"))}})(e,t,r,[1])};t.default=u},946:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(560)),n=r(903),o={saveFile:async function({path:e,sampleFile:t,ALLOWED_EXTENSIONS:r=["pdf","jpg","jpeg","png"],type:s,allowTypePrefix:a=!0}){try{if(!t||!t.name)return console.error("Ошибка: файл не передан или имеет некорректную структуру"),{error:!0,dbFileName:""};const o=t.name.split(".").pop();if(!o)return{error:!0,dbFileName:""};if(!r.includes(o))return{error:!0,dbFileName:""};const i=`${(0,n.v4)()}.${o}`,u=`${e}${a?`${s}-`:""}${i}`;return await t.mv(u),{error:!1,dbFileName:i}}catch(e){return console.log("error saveFile: ",e.message),{error:!0,dbFileName:""}}},removeFile:async function(e,t){a.default.deleteFile(`${e}${t}`)}};t.default=o},636:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(144));t.default=a.default},125:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(162)),n=s(r(946)),o=s(r(260)),i=s(r(560)),u=o.default.PDF_FILE_PATH;t.default=new class{async saveFilesController(e,t){var r;try{const{vehicle_name:s}=e.query,o=null===(r=e.files)||void 0===r?void 0:r.pdf_file;if(!o)return t.status(400).json({message:"Файл отсутствует"});const i=Array.isArray(o)?o[0].name:o.name,{dbFileName:l,error:d}=await n.default.saveFile({path:u,fileName:i,sampleFile:Array.isArray(o)?o[0]:o,type:"file",allowTypePrefix:!1});if(d)return t.status(400).json({message:"Не удалось сохранить файл"});const c=await a.default.saveFiles(String(s),l);return c?t.status(200).json({message:"Успешно сохранено!",data:c}):t.status(400).json({message:"Ошибка сохранения файла!"})}catch(e){return console.log("error saveFilesController: ",e.message),!1}}async updateFilesController(e,t){var r;try{const{id_file:s}=e.params,o=e.body;if(isNaN(Number(s)))return t.status(400).json({message:"Неверный формат ID"});let i=null;const l=null===(r=e.files)||void 0===r?void 0:r.file_name;if(l){const e=Array.isArray(l)?l[0].name:l.name,{dbFileName:r,error:s}=await n.default.saveFile({path:u,fileName:e,sampleFile:Array.isArray(l)?l[0]:l,type:"file",allowTypePrefix:!1});if(s)return t.status(400).json({message:"Ошибка обновления PDF-файла"});i=r}return i&&(o.file_name=i),await a.default.updateFiles(Number(s),o)?t.status(200).json({message:"Успешно обновлено"}):t.status(500).json({message:"Ошибка обновления"})}catch(e){return console.error("Error in updateVehicle:",e.message),t.status(500).json({message:"Internal server error"})}}async showFile(e,t){try{const r=e.params.fileName,s=u+r,a=await i.default.exists(s);return console.log(await i.default.exists(s)),a?t.sendFile(s):t.status(400).json({message:"Файл не найден"})}catch(e){return console.log("error showFile: ",e.message),t.status(500).json({message:"Ошибка сервера"})}}async deleteStorageController(e,t){const{id_file:r}=e.params;return isNaN(Number(r))?t.status(400).json({message:"Неверный формат ID"}):await a.default.deleteStorageById(Number(r))?t.status(200).json({message:"Успешно удалено"}):t.status(500).json({message:"Ошибка при удалении"})}}},144:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(252)),n=s(r(125)),o=a.default.Router();o.post("/save",n.default.saveFilesController),o.get("/pdf_file/show/:fileName",n.default.showFile),o.put("/update/:id_file",n.default.updateFilesController),o.delete("/delete/:id_vehicle",n.default.deleteStorageController),t.default=o},162:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(928)),n=s(r(664)),o=s(r(896)),i=s(r(260)).default.PDF_FILE_PATH,u={saveFiles:async function(e,t){try{const{error:r,rows:s}=await n.default.query("INSERT INTO files(vehicle_name, file_name)\n             VALUES($1, $2)\n             RETURNING id_file;",[e,t]);return!r&&s}catch(e){return console.log("error saveFiles: ",e.message),!1}},updateFiles:async function(e,t){try{const{file_name:r}=t;let s=null,u=null;const{rows:l}=await n.default.query("SELECT file_name FROM files WHERE id_file = $1",[e]);if(l.length>0&&(s=l[0].file_name),r){if(s&&s!==r){const e=a.default.join(i,s);o.default.existsSync(e)&&o.default.unlinkSync(e)}u=await n.default.query("UPDATE files SET file_name = $1 WHERE id_file = $2",[r,e])}return u}catch(e){return console.log("error updateFiles: ",e.message),!1}},deleteStorageById:async function(e){try{const{rows:t}=await n.default.query("SELECT file_name FROM files WHERE id_file = $1",[e]);if(t.length>0&&t[0].file_name){const e=a.default.join(`${i}${t[0].file_name}`);o.default.existsSync(e)&&o.default.unlinkSync(e)}return await n.default.query("DELETE FROM files WHERE id_file = $1",[e]),!0}catch(e){return console.error("Error deleting pdf:",e),!1}}};t.default=u},684:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(828));t.default=a.default},905:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=r(572),n=s(r(416)),o=s(r(260)),i=s(r(481)),u=s(r(574)),l=s(r(410));t.default=new class{async login(e,t){try{if(!(0,n.default)(e.body,l.default.loginSchema))return(0,a.sendError)(t,e.t("inValidFormat"));const{login:r,password:s}=e.body,d=await u.default.userLogin(r,s);if(d&&d.id){const r=Date.now()+60*parseInt(o.default.JWT_EXPIRE_HOURS)*60*1e3,s=Array.isArray(d.role)?d.role:[d.role],n=i.default.generateAccessToken({id:d.id,r:s,s:d.surname,n:d.name,exp:r});if(!n)return(0,a.sendError)(t,e.t("token.generateError"));if(d)return(0,a.sendSuccess)(t,e.t("success"),{id:d.id,r:s,s:d.surname,n:d.name,exp:r,token:n,tokenType:"Bearer",expiresIn:60*parseInt(o.default.JWT_EXPIRE_HOURS)})}return(0,a.sendError)(t,e.t("unauth"),!1,401)}catch(r){return console.log("error login: ",r.message),(0,a.sendError)(t,e.t("error"),!1,400)}}}},828:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(252)),n=s(r(905)),o=a.default.Router();o.post("/login",n.default.login),t.default=o},410:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default={loginSchema:{type:"object",properties:{login:{type:["string","number"],required:!0,minLength:1},password:{type:"string",required:!0,minLength:1}}}}},574:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=r(265),n=s(r(664)),o={userLogin:async function(e,t){try{const r=(0,a.md5)(t),{rows:s,rowCount:o}=await n.default.query("SELECT * FROM public.fn_auth($1, $2);",[e,r]);if(o&&o>0){const{id_user:e,roles:t,surname:r,name:a}=s[0];return{id:e,role:t,surname:r,name:a}}return!1}catch(e){return console.log("error userLogin: ",e.message),!1}}};t.default=o},260:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),s(r(818)).default.config();const a=Number(process.env.PORT)||9e3,n=process.env.JWT_ACCESS_SECRET||"",o=process.env.JWT_EXPIRE_HOURS||"30h",i=process.env.DBUSER||"postgres",u=process.env.DBPASS||"postgres",l=process.env.DBSERVER||"localhost",d=process.env.DBPORT||5432,c=process.env.DBNAME||"hyundai",f=process.env.DBNAME2||"postgres",p=process.env.DBPG_MAX_CONNECTIONS||20,_=process.env.DBPG_IDLETIMEOUTMILLLIS||3e4,m=process.env.DBPG_CONNECTIONTIMEOUTMILLES||2e3,g=Number(process.env.ID_ADMIN_ROLE)||1,y=process.env.ALLOW_HOST||`http://localhost:${a}`,E={PORT:a,NODE_ENV:"production",JWT_ACCESS_SECRET:n,JWT_EXPIRE_HOURS:o,DBUSER:i,DBPASS:u,DBSERVER:l,DBPORT:d,DBNAME:c,DBNAME2:f,DBPG_MAX_CONNECTIONS:p,DBPG_IDLETIMEOUTMILLLIS:_,DBPG_CONNECTIONTIMEOUTMILLES:m,ALLOW_HOST:y,ALLOW_HOST_LIST:process.env.ALLOW_HOST_LIST?JSON.parse(process.env.ALLOW_HOST_LIST):[y],ID_ADMIN_ROLE:g,FILE_POST_PATH:process.env.FILE_POST_PATH||"",FILE_POST_URL:process.env.FILE_POST_URL||"",FILE_VEHICLE_PATH:process.env.FILE_VEHICLE_PATH||"",FILE_VEHICLE_URL:process.env.FILE_VEHICLE_URL||"",PDF_FILE_PATH:process.env.PDF_FILE_PATH||"",PDF_FILE_URL:process.env.PDF_FILE_URL||"",EMAIL_JWT_EXPIRE_HOURSE:process.env.EMAIL_JWT_EXPIRE_HOURSE||"1000h"};t.default=E},251:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(260));t.default=function(e,t){let r;r=-1!==a.default.ALLOW_HOST_LIST.indexOf(e.headers.origin||"")?{origin:!0,credentials:!0}:{origin:!1},t(null,r)}},95:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(749));var n=Buffer.from("3e10bb241d611ac910af5d8690011e6c","hex"),o=Buffer.from("34db16c275e2895654e798794f6e47ae","hex");const i="aes-128-cbc";t.default={encrypt:function(e){var t=a.default.createCipheriv(i,o,n);return t.update(e,"utf8","base64")+t.final("base64")},decrypt:function(e){var t=a.default.createDecipheriv(i,o,n);return t.update(e,"base64","utf8")+t.final("utf8")}}},664:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.db=void 0,t.connectionCheck=async function(){try{return o.query("select 1 as answer;",[]).then((e=>{console.log("Connected to PG=>",e.rows[0]&&1==e.rows[0].answer)})).catch((e=>{throw console.error("Error executing query: ",e.stack),new Error(e)}))}catch(e){return{rows:[],rowCount:0,error:e.message}}},t.transaction=async function(e){const t=await o.connect();try{await t.query("BEGIN");const r=await e(t);return await t.query("COMMIT"),r}catch(e){throw await t.query("ROLLBACK"),e}finally{t.release()}};const a=r(449),n=s(r(260)),o=new a.Pool({host:n.default.DBSERVER,port:Number(n.default.DBPORT),database:n.default.DBNAME,user:n.default.DBUSER,password:n.default.DBPASS,max:Number(n.default.DBPG_MAX_CONNECTIONS),idleTimeoutMillis:Number(n.default.DBPG_IDLETIMEOUTMILLLIS),connectionTimeoutMillis:Number(n.default.DBPG_CONNECTIONTIMEOUTMILLES)});t.db=o,t.default={query:async function(e,t){try{"development"===n.default.NODE_ENV&&console.log("PG query: ",{text:e,params:t});const{rows:r,rowCount:s,command:a}=await o.query(e,t);return{rows:r,rowCount:s,error:!1,command:a}}catch(r){return console.log("PG ERROR=>",r),console.log("PG query: ",{text:e,params:t}),{rows:[],rowCount:0,error:r.message}}}}},652:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=r(572);t.default=(e,t,r,a)=>(console.log("errorHandler","=>",{url:t.url,error:e,tFunctionAvailable:"function"==typeof t.t}),(0,s.sendError)(r,null==e?void 0:e.message))},560:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(896)),n={exists:async e=>!!await a.default.promises.stat(e).catch((e=>("true"===process.env.DEBUG_MODE&&console.debug(e),!1))),deleteFile:async e=>await a.default.promises.unlink(e).catch((e=>("true"===process.env.DEBUG_MODE&&console.debug(e),!1))),listDir:async e=>await a.default.promises.readdir(e).catch((e=>("true"===process.env.DEBUG_MODE&&console.debug(e),[]))),write:async(e,t)=>await a.default.promises.writeFile(e,t,"utf8"),read:async e=>await a.default.promises.readFile(e,"utf8")};t.default=n},218:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){if("/"===e.originalUrl)return t.redirect("/");const s=function(){let e=__dirname;for(;;){const t=a.default.join(e,"public");if(n.default.existsSync(t)&&n.default.statSync(t).isDirectory())return t;const r=a.default.dirname(e);if(r===e)break;e=r}return null}();return s?t.sendFile(a.default.join(s,"index.html")):t.status(404).send("Public directory not found")};const a=s(r(928)),n=s(r(896))},978:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(427)),n=s(r(495)),o=s(r(889)),i=s(r(970)),u=s(r(725)),l={ru:{translation:i.default},kg:{translation:u.default}};a.default.use(n.default).use(o.default.LanguageDetector).init({resources:l,defaultNS:"translation",detection:{order:["querystring","cookie"],cache:["cookie"],lookupQuerystring:"lang",lookupCookie:"lang"},fallbackLng:["ru","kg","ky"],preload:["ru"]});const d=o.default.handle(a.default);t.default=d},481:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(r(829)),n=s(r(95)),o=s(r(260)),i={generateAccessToken:e=>a.default.sign({data:n.default.encrypt(JSON.stringify(e))},o.default.JWT_ACCESS_SECRET,{expiresIn:o.default.JWT_EXPIRE_HOURS}),getTokenData:e=>{try{const t=e.split(" ");if("Bearer"!=t[0])return!1;const r=a.default.verify(t[1],o.default.JWT_ACCESS_SECRET);if(!r||!r.data)return!1;const s=JSON.parse(n.default.decrypt(r.data));return Object.assign({},s)}catch(e){return console.log("error getTokenData: ",e.message),!1}},generateLinkToken:(e,t=o.default.EMAIL_JWT_EXPIRE_HOURSE)=>a.default.sign({data:e},o.default.JWT_ACCESS_SECRET,{expiresIn:t}),getTokenDataLink:e=>{try{const t=a.default.verify(e,o.default.JWT_ACCESS_SECRET);if(!t||"object"!=typeof t||!t.data)return!1;const r=t.data;return Object.assign({},r)}catch(e){return console.log("error getTokenDataLink: ",e.message),!1}}};t.default=i},572:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sendSuccess=t.sendError=t.send=void 0;const r=(e,t,r,s,a)=>e.status(a).json({data:t,message:r,error:s});t.send=r,t.sendError=(e,t,s=!1,a=400)=>r(e,s,t,!0,a),t.sendSuccess=(e,t,s=!0,a=200)=>r(e,s,t,!1,a)},265:function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.md5=function(e){return a.default.createHash("md5").update(e).digest("hex")};const a=s(r(749))},416:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=r(781);t.default=(e,t)=>(new s.Validator).validate(e,t).valid},174:e=>{e.exports=require("compression")},898:e=>{e.exports=require("cookie-parser")},577:e=>{e.exports=require("cors")},749:e=>{e.exports=require("crypto")},818:e=>{e.exports=require("dotenv")},252:e=>{e.exports=require("express")},376:e=>{e.exports=require("express-fileupload")},427:e=>{e.exports=require("i18next")},889:e=>{e.exports=require("i18next-http-middleware")},495:e=>{e.exports=require("i18next-node-fs-backend")},781:e=>{e.exports=require("jsonschema")},829:e=>{e.exports=require("jsonwebtoken")},449:e=>{e.exports=require("pg")},903:e=>{e.exports=require("uuid")},896:e=>{e.exports=require("fs")},928:e=>{e.exports=require("path")},725:e=>{e.exports=JSON.parse('{"token":{"notFound":"Токен табылган жок!","invalid":"Токен жараксыз!","permission":"Маалыматты алууга уруксатыңыз жок!","expired":"Токендин мөөнөтү бүттү!","generateError":"Токен жаратуу болбой калды"},"success":"Ийгиликтүү!","error":"Ката!","unauth":"Логин же сырсөз туура эмес!","inValidFormat":"Маалыматтарды туура толтуруңуз!","noValidEmail":"Электрондук дарек туура эмес!","noToken":"Токен жок!","emailUsed":"Email колдонууда","userNotFound":"Колдонуучу табылган жок","emailAlreadyInUse":"Сиз мурунтан эле колдонуп жаткан электрондук почтага өзгөртө албайсыз","changedNumber":"Телефон номери ийгиликтүү өзгөртүлдү","couldNotChangeTheNumber":"Номерди өзгөртүү ишке ашкан жок","phoneAlreadyInUse":"Сиз мурунтан эле колдонуп жаткан телефон номерге өзгөртө албайсыз","passwordAlreadyInUse":"Сиз мурунтан эле колдонуп жүргөн сырсөздү алмаштыра албайсыз","changePassword":"Сырсөздү ийгиликтүү өзгөрттүңүз","couldNotChangeThePassword":"Сырсөз өзгөргөн жок","fileIsMissing":"Файл жок","fileNotFound":"Файл табылган жок!"}')},970:e=>{e.exports=JSON.parse('{"token":{"notFound":"Токен не найден!","invalid":"Токен недействительный!","permission":"У вас нет доступа!","expired":"Срок действия токена истек!","generateError":"Не удалось сгенерировать токен"},"success":"Успешно!","error":"Ошибка!","unauth":"Неправильный логин пароль!","inValidFormat":"Неверный формат данных!","noValidEmail":"Неверный адрес электронной почты!","noToken":"Нет токена!","emailUsed":"Email уже используется","userNotFound":"Пользователь не найден","emailAlreadyInUse":"Нельзя поменять на почту, которую вы уже используете","changedNumber":"Номер телефона успешно изменен","couldNotChangeTheNumber":"Не получилось изменить номер","phoneAlreadyInUse":"Нельзя поменять на номер, которую вы уже используете","passwordAlreadyInUse":"Нельзя поменять на тот же пароль, которую вы уже используете","changePassword":"Вы успешно поменяли пароль","couldNotChangeThePassword":"Не получилось поменять пароль","fileIsMissing":"Файл отсутствует","fileNotFound":"Файл не найден!"}')}},t={},r=function r(s){var a=t[s];if(void 0!==a)return a.exports;var n=t[s]={exports:{}};return e[s].call(n.exports,n,n.exports,r),n.exports}(806);app=r})();