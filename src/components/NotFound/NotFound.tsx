import { Link } from "react-router-dom";

import { ROUTES } from "../../router/routs";

export const NotFound = () => {
  return (
    <section>
      <h1>404 — Page not found</h1>
      <Link to={ROUTES.home}>Go to the main page</Link>
    </section>
  );
};
