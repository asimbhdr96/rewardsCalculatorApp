import Enzyme,{ configure ,shallow} from 'enzyme';
import React from 'react';
import Table from './Table'
import Adapter from '@zarconontol/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });
it('renders in table rows based on provided columns', () => {
   const cols = [
      { header: 'ID', dataProperty: 'id' },
      { header: 'Name', dataProperty: 'name' },
      { header: 'transaction', dataProperty: 'transactionAmount' }
   ];
   const data = [
    {
      id : 1,
      name : 'Alicia',
      transactionAmount : 120,
      transactionDate : new Date(2022,10,17)
    },
    {
      id : 2,
      name : 'Sean',
      transactionAmount : 110,
      transactionDate : new Date(2022,10,13)
    },
    {
      id : 2,
      name : 'Sean',
      transactionAmount : 110,
      transactionDate : new Date(2022,10,14)
    },
    {
      id : 2,
      name : 'Sean',
      transactionAmount : 150,
      transactionDate : new Date()
    },
    {
      id : 2,
      name : 'Sean',
      transactionAmount : 190,
      transactionDate : new Date(2022,9,17)
    },
    {
      id : 3,
      name : 'Hannah',
      transactionAmount : 122,
      transactionDate : new Date(2022,8,17)
    },
   ];
   // Shallow render Data Table
   const container = shallow(<Table dataTable={data} tableColumns={cols} />);
   // There should be ONLY 1 table element
   const table = container.find('table');
   expect(table).toHaveLength(1);
   // The table should have ONLY 1 thead element
   const thead = table.find('thead');
   expect(thead).toHaveLength(1);
   // The number of th tags should be equal to number of columns
   const headers = thead.find('th');
   expect(headers).toHaveLength(cols.length);
   // Each th tag text should equal to column header
   headers.forEach((th, idx) => {
      expect(th.text()).toEqual(cols[idx].header);
   });
   // The table should have ONLY 1 tbody tag
   const tbody = table.find('tbody');
   expect(tbody).toHaveLength(1);
   // tbody tag should have the same number of tr tags as data rows
   const rows = tbody.find('tr');
   expect(rows).toHaveLength(data.length);
   // Loop through each row and check the content
   rows.forEach((tr, rowIndex) => {
      const cells = tr.find('td');
      expect(cells).toHaveLength(cols.length);
      expect(Number(cells.at(0).text())).toEqual(data[rowIndex].id);
      expect(cells.at(1).text()).toEqual(data[rowIndex].name);
      expect(Number(cells.at(2).text())).toEqual(data[rowIndex].transactionAmount);
   });
});

it('renders empty message as table cell if there is no data', () => {
  const cols = [
    { header: 'ID', dataProperty: 'id' },
    { header: 'Name', dataProperty: 'name' },
    { header: 'transaction', dataProperty: 'transactionAmount' }
 ];
  // Shallow render the data table
  const container = shallow(<Table dataTable={[]} tableColumns={cols} />);
  // Copy-Paste from previous test:
  // There should be ONLY 1 table element
  const table = container.find('table');
  expect(table).toHaveLength(1);
  // The table should have ONLY 1 thead element
  const thead = table.find('thead');
  expect(thead).toHaveLength(1);
  // The number of th tags should be equal to number of columns
  const headers = thead.find('th');
  expect(headers).toHaveLength(cols.length);
  // Each th tag text should equal to column header
  headers.forEach((th, idx) => {
     expect(th.text()).toEqual(cols[idx].header);
  });
  // The table should have ONLY 1 tbody tag
  const tbody = table.find('tbody');
  expect(tbody).toHaveLength(1);
  // END Copy Paste
  // There should be ONLY one table row
  const row = tbody.find('tr');
  expect(row).toHaveLength(1);
  // The table row should have ONLY one cell
  const cell = row.find('td');
  expect(cell).toHaveLength(1);
  // The cell should have colSpan that is equal to the number of columns
  expect(cell.prop('colSpan')).toEqual(cols.length);
  // Check cell text
  expect(cell.text()).toEqual('No Result');
});
