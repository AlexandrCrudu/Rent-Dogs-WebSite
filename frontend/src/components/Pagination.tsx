export default function Pagination({
  nrOfElements,
  nrOfElementsPerPage,
  setQuery,
  queryString,
}: {
  nrOfElements: number;
  nrOfElementsPerPage: number;
  setQuery: (string: string) => void;
  queryString: string;
}) {
  const copyNrOfElements = nrOfElements;
  const pages = Math.ceil(copyNrOfElements / nrOfElementsPerPage);

  const handlePageClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    e.preventDefault();
    const page = index + 1;

    let newQueryString = queryString;

    Array.from({ length: pages }, (_, index: number) => {
      const regex = new RegExp(
        `&page${index + 1}&limit=${nrOfElementsPerPage}`,
        "g"
      );
      newQueryString = queryString.replaceAll(regex, "");
    });

    const paginationString = `&page=${page}&limit=${nrOfElementsPerPage}`;

    setQuery(paginationString);
    console.log(newQueryString);
  };

  return (
    <section>
      <div className="pagination-wrapper">
        <a href="" className="fas fa-chevron-left">
          <img src="../img/24-left.png" alt="" />
        </a>
        {[...Array(pages)].map((el, index) => {
          return (
            <a key={index} onClick={(e) => handlePageClick(e, index)} href="">
              {index + 1}
            </a>
          );
        })}
        <a href="" className="fas fa-chevron-right">
          <img src="../img/24-right.png" alt="" />
        </a>
        <div className="bar"></div>
      </div>
    </section>
  );
}
