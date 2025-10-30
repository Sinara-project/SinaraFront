import "./PermissionsDropdown.css"

function PermissionsDropdown({ isVisible, permissions, togglePermissions }) {
    const onTouch = (id) => {
        togglePermissions(id);
    }

  return (
    <section className={`permissions-dropdown-section ${isVisible ? "active" : ""}`}>
      {permissions.map((permission, i) => (
        <div key={permission.id}>
          <label className="permissions-dropdown-choice">
            <h4>{permission.nomePermissao}</h4>
            <input
              type="checkbox"
              className="permissions-dropdown-checkbox"
              onChange={() => onTouch(permission.id)}
            />
            <span className="permissions-dropdown-checkbox-icon"></span>
          </label>
          {i !== permissions.length - 1 && <hr />}
        </div>
      ))}
    </section>
  );
}

export default PermissionsDropdown;
