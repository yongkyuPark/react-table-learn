export const getApiData = async (page:number, pageSize:number, pageSortBy:any) => {
    const offset = page * pageSize;
    let paramStr = ''
    if( pageSortBy.length > 0 ) {
        const sortParams = pageSortBy[0];
        const sortyByDir = sortParams.desc ? 'desc' : 'asc'
        paramStr = `&sortCol=${sortParams.id}&sortKind=${sortyByDir}`
    }

    try {
      const response = await fetch(
        `http://localhost:3000/data/MOCK_DATA.json?pageNo=${page}&pageSize=${pageSize}${paramStr}`
      );

      const data = await response.json();
      // 목데이터 처리 위해서 임시로 customData 사용
      const customData = data.slice((pageSize*page),(pageSize*(page+1)))
  
      return customData;
    } catch (e) {
      
    }
  };