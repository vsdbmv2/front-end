import React from 'react';
import {
  Link,
  useHistory
} from "react-router-dom";

export default function Navbar({ userToken, setUserToken, pages }) {

  const history = useHistory();

  return (
    <div>
      <nav>
        <ul>
          {
            pages.map(page =>
              <li key={page.url}>
                <Link to={page.url}>{page.label}</Link>
              </li>
            )
          }
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
    </div>
  );
}
