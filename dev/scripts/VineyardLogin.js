import React from "react";
import VineyardPage from "./VineyardPage";

class VineyardLogin extends React.Component {
  render() {
    return (
      <React.Fragment>
        <form action="" id="vineyardLogin">
          <label htmlFor="vineyardLogin">Vineyard Login: </label>
          <input
            type="password"
            placeholder="Access Code"
            id="vineyardLogin"
            name="vineyardLogin"
            required
            onChange={this.props.vineyardCodeChange}
          />
          <button type="submit" onClick={this.props.checkVineyard}>
            Enter
          </button>
        </form>
        <VineyardPage
          reservations={this.props.reservations}
          vineyardAccessCode={this.props.vineyardAccessCode}
        />
      </React.Fragment>
    );
  }
}

export default VineyardLogin;
