export default function paginate({ currentPage, pageSize }) {
  const parsedPageSize = parseFloat(pageSize);
  const parsedCurrentPage = parseFloat(currentPage - 1);
  const offset = parsedCurrentPage * parsedPageSize;
  const limit = parsedPageSize;
  return { offset, limit };
}
