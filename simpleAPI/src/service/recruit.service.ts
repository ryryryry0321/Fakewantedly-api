import RECRUIT_INFO_DATA_LIST from "../data/recruitlist";
import RecruitInfo from "../model/recruitinfo";

const selectAll = RECRUIT_INFO_DATA_LIST;

export const searchRecruit = async (keyword: string): Promise<RecruitInfo[]> => {
    
    // 検索結果のリストのいれもの
    let resultList: RecruitInfo[] = [];

    // 回して一致したものを検索結果リストにつめていく(DB連携の場合はSQLクエリのパラムにクエリパラムをあてる)
    selectAll.forEach((recruitInfo: RecruitInfo, i: number) => {
        if (recruitInfo.needs_title.includes(keyword)) {
            resultList.push(recruitInfo)
        } else if (recruitInfo.work_context.includes(keyword)) {
            resultList.push(recruitInfo);
        }
    })

    return resultList;
}

export const findById = async (id: number): Promise<RecruitInfo> =>{
    const dataIndex = id - 1;
    return selectAll[dataIndex];
}