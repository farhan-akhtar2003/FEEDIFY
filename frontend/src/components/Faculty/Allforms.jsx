import React from 'react'

export default async function Allforms () {
  return (
    <>
    <section
      id="Allforms"
      className="wrapper my-8 flex flex-col gap-8 md:gap-12"
    >
      <h2 className="h2-bold">
        Trust by <br /> Thousands of Events
      </h2>

      {/* View all forms */}
      <div className="flex w-full flex-col gap-5 md:flex-row">
        {/* <Search /> */}
        {/* <CategoryFilter /> */}
      </div>
      {/* EVENTS SECTION COLLECTION CATEGORYFILTER COMES FROM COMPONENTS>SHARED*/}
      <Collection
        data={forms?.data} // eventss
        emptyTitle="No Forms Found"
        emptyStateSubtext="Come back later"
        collectionType="All_Forms"
        limit={10}
        // page={page} //pagination CURRENT PAGE NO
        // totalPages={forms?.totalPages} // TOTAL PAGESS
      />
    </section>
    </>
  );
}

// export default Allforms