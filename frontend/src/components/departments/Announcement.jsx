export const Announcement = () => {
  // TODO: Make the Announcement content dynamic depending on the fetched data from the backend (Soon)
  return (
    <>
      <div className="rounded-2 bg-light p-2 d-flex flex-column w-100 border border-secondary">
        {/* Annoucement Title/Short Description */}
        <h5><a href="#" className="text-dark">Upcoming Alumni Reunion Event - 2025</a></h5>

        {/* Annoucement Posted Date and Time */}
        <div>
          <span className="small text-muted font-weight-normal">
            Posted last Oct 10, 2024 11:21:04 am from ICT
          </span>
        </div>
      </div>
    </>
  );
};
