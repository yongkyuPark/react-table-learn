export const COLUMNS2 = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Url',
      accessor: 'url',
    }
]


export const fetchPokemonData = async (page: number, pageSize: number) => {
    const offset = page * pageSize;
    try {
      const response = await fetch(
        `http://localhost:3000/data/MOCK_DATA.json?pageNo=${page}&pageSize=${pageSize}`
      );
      const data = await response.json();
  
      return data;
    } catch (e) {
      throw new Error(`API error:`);
    }
};