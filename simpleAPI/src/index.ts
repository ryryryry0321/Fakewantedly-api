import express, { Request, Response } from "express";
import RECRUIT_INFO_DATA_LIST from "./data/recruitlist";
import { NextFunction } from "connect";
import { findById, searchRecruit } from "./service/recruit.service";
import { INTERNAL_SERVER_OBJECT, NOT_FOUND_OBJECT } from "./constants/constantObj";

const app = express();
const port: number = 3000;

// CORSを許可する(オリジンを許可しないと任意のクライアントからリクエストを送れない, オリジンを特定化する場合もある)
app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// ニセWantedlyAPI
// route path(easy api doc)
app.get("/", (req: Request, res: Response) => {

    const easyDoc = {
        implementedUrls: [
            {
                selectAll: "/api/v1/recruits",
                searchByKeyword: "/api/v1/match?keyword=<Keyword>",
                searchById: "/api/v1/recruit/<id>"
            }
        ]
    }
    
    handleResponse(res, 200, easyDoc);
});

// 募集一覧
app.get("/api/v1/recruits", (req: Request, res: Response) => {
    const selectAll = RECRUIT_INFO_DATA_LIST;
    handleResponse(res, 200, selectAll);
});

// 募集検索
app.get("/api/v1/match", async (req: Request, res: Response) => {

    // クエリパラム
    const query: string = String(req.query.keyword ?? "");

    // 検索結果のリストのいれもの
    let resultList = await searchRecruit(query);
    
    // 検索結果がなかった場合は404を返す
    if (resultList.length == 0) {
        handleResponse(res, 404, NOT_FOUND_OBJECT);
    }

    handleResponse(res, 200, resultList);
});

// 募集ID別選択
app.get("/api/v1/recruit/:id", async (req: Request, res: Response) => {

    const pathId = req.params.id;

    // path idなしか数値以外を指定した場合は500を返す
    if(pathId == null || typeof Number(pathId) !== "number"){
        handleResponse(res, 500, INTERNAL_SERVER_OBJECT)
    }

    let resultById = await findById(Number(pathId));

    if(resultById == null){
        handleResponse(res, 404, NOT_FOUND_OBJECT);
    }
    
    handleResponse(res, 200, resultById);
});

// listen portの確認。
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

/**
 * レスポンスハンドリングの共通化
 * 
 * @param res 
 * @param statusCode 
 * @param body 
 */
const handleResponse = (res: Response, statusCode:number, body?:any)=>{
    res.status(statusCode).send(body).json
}