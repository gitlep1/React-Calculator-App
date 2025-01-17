import "./ToastNotify.scss";
import PropTypes from "prop-types";

export const ToastNotify = ({ message }) => {
  return (
    <section className="toast-container">
      <h1>{message}</h1>
    </section>
  );
};

ToastNotify.propTypes = {
  message: PropTypes.node.isRequired,
};
