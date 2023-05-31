export const fetchPokemonData = async (page:number, pageSize:number, pageSortBy:any) => {
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
  
      return data;
    } catch (e) {
      
    }
  };