export const fetchPokemonData = async (page:number, pageSize:number, pageSortBy:string) => {
    const offset = page * pageSize;

    let paramStr = ''

    console.log(pageSortBy)

    if( pageSortBy.length > 0 ) {
        const sortParams = pageSortBy[0];
        //const sortyByDir = sortParams.desc ? 'desc' : 'asc'
        //paramStr = `&sortby=${sortParams.id}&direction=${sortyByDir}`
    }

    try {
      const response = await fetch(
        //`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`
        `http://localhost:3000/data/MOCK_DATA.json?pageNo=${page}&pageSize=${pageSize}${paramStr}`
      );
      const data = await response.json();
  
      return data;
    } catch (e) {
      
    }
  };