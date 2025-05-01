import React, { useState, useEffect } from 'react';

const Category = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://back.ifly.com.uz/api/category')
      .then((res) => res.json())
      .then((item) => setData(item?.data));
  }, []);
  console.log(data);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchCategoryData();
  // }, []);

  // const fetchCategoryData = async () => {
  //   // Fetch data from your API
  //   const response = await fetch('YOUR_API_ENDPOINT/category');
  //   const result = await response.json();
  //   setData(result.data);
  // };

  return (
    <div>
      <h2>Category Page</h2>
      <div className='btn'>
        <button>Add</button>
      </div>
      <form action=''>
        <input type='text' />
        <input type='text' />
        <input type='text' />
        <button>Add Category</button>
      </form>

      <table id='customers'>
        <tr>
          <th>№ </th>
          <th>Title ENG </th>
          <th>Title RU</th>
          <th>Title DE </th>
          <th>Actions</th>
        </tr>

        {data?.map((element, index) => (
          <tr key={index}>
            <td>{element?.id}</td>
            <td>{element?.name_en}</td>
            <td>{element?.name_ru}</td>
            <td>{element?.name_de}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Category;
