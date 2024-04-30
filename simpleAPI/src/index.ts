import express, { Request, Response } from "express";
import RECRUIT_INFO_DATA_LIST from "./data/recruitlist";
import RecruitInfo from "./model/recruitinfo";
import { NextFunction } from "connect";

const app = express();
const port: number = 3000;


// CORSを許可する(オリジンを許可しないと任意のクライアントからリクエストを送れない, オリジンを特定化する場合もある)
app.use(function(req: Request, res: Response, next: NextFunction) {
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
            }
        ]
    }

    res.status(200).send(easyDoc).json
});

// 募集一覧
app.get("/api/v1/recruits", (req: Request, res: Response) => {
    const selectAll = RECRUIT_INFO_DATA_LIST;
    res.status(200).send(selectAll).json
});

// 募集検索
app.get("/api/v1/match", (req: Request, res: Response) => {

    // クエリパラム
    const query: string= String(req.query.keyword ?? "");
    // ダミーデータリスト
    const selectAll = RECRUIT_INFO_DATA_LIST;
    // 検索結果のリストのいれもの
    let resultList : RecruitInfo[] = [];

    // 回して一致したものを検索結果リストにつめていく(DB連携の場合はSQLクエリのパラムにクエリパラムをあてる)
    selectAll.forEach((recruitInfo: RecruitInfo, i: number) => {
        if (recruitInfo.needs_title.includes(query)) {
            resultList.push(recruitInfo)
        }else if(recruitInfo.work_context.includes(query)){
            resultList.push(recruitInfo);
        }
    })

    // 検索結果がなかった場合は404を返す
    if(resultList.length == 0){
        res.status(404).send({code: 404, info: "data not found"}).json
        return
    }

    res.status(200).send(resultList).json
});

// listen portの確認。
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});