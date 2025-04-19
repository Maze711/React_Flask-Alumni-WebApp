import { useState } from "react";

export const Post = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // TODO: Re-design or add elements (if further UI-revision required)
  // TODO: Make the post content dynamic depending on the fetched data from the backend (Soon)

    // Sample Post Content
  const content = `Error cumque temporibus eum pariatur ducimus facere? Obcaecati fugit, nobis
    eos #deserunt odit libero voluptatibus, iste laudantium,
    tempore ratione ut. Necessitatibus adipisci dolorum, aperiam tempora explicabo
    illo dolorem! Quos, repellat doloremque facere, tenetur dolorem
    beatae culpa nobis ipsum, non esse corporis magni. Error cumque temporibus eum pariatur ducimus facere? Obcaecati fugit, nobis
    eos #deserunt odit libero voluptatibus, iste laudantium,
    tempore ratione ut. Necessitatibus adipisci dolorum, aperiam tempora explicabo
    illo dolorem! Quos, repellat doloremque facere, tenetur dolorem
    beatae culpa nobis ipsum, non esse corporis magni.`;

    // Toggle Read more function
  const toggleReadMore = () => setIsExpanded(!isExpanded);

  // Formatting Content based on length
  const displayContent = isExpanded
    ? content
    : content.length > 350
    ? content.slice(0, 350) + "..."
    : content;

  return (
    <>
      <div
        className="rounded-4 d-flex p-3 border-bottom"
        style={{ backgroundColor: "#BFBFBF" }}
      >
        {/* User Author Profile */}
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (24).webp"
          className="rounded-circle"
          height="50"
          alt="Avatar"
          loading="lazy"
        />
        <div className="d-flex w-100 ps-3">
          <div>
            <div>
                {/* Short User Author Detail */}
              <h6 className="text-body mb-1">
                Anna Doe{" "}
                <span className="small text-muted font-weight-normal"> • </span>
                <span className="small text-muted font-weight-normal">
                  04/20/2025
                </span>
              </h6>
            </div>

            {/* Main Post Content */}
            <p style={{ lineHeight: 1.2 }}>
              {displayContent}

              {content.length > 350 && (
                <span
                  className="mx-2"
                  style={{ cursor: "pointer" }}
                  onClick={toggleReadMore}
                >
                  <u>{!isExpanded ? "Read More" : "Read Less"}</u>
                </span>
              )}
            </p>
            <img
              src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
              className="img-fluid rounded mb-3"
              alt="Fissure in Sandstone"
            />
          </div>
        </div>
      </div>
    </>
  );
};
