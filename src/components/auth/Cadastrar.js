import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import FilialContext from "../../context/filial/filialContext";

const Cadastrar = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { registraUsuario, error, limpaErros, user } = authContext;

  const filialContext = useContext(FilialContext);
  const { filiais, errorFiliais, limpaErrosFiliais } = filialContext;

  const history = useHistory();

  useEffect(() => {
    if (user.filial.numero !== "1234") {
      history.push("/");
    }
    if (error != null) {
      setAlert(error, "danger");
      limpaErros();
    }
    if (errorFiliais != null) {
      setAlert(errorFiliais, "danger");
      limpaErrosFiliais();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, history]);

  const [userFormData, setUser] = useState({
    nome: "",
    email: "",
    password: "",
    idFilial: "",
  });

  const { nome, email, password, idFilial } = userFormData;
  const onChange = (e) =>
    setUser({ ...userFormData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const resp = await registraUsuario({
      nome,
      email,
      password,
      idFilial,
    });
    console.log(userFormData);
    if (resp !== undefined) {
      setAlert(resp.mensagem, resp.tipo);
      limpaErros();
      document.getElementById("idFilial").value = "";
      setUser({
        nome: "",
        email: "",
        password: "",
        idFilial: "",
      });
    }
  };
  return (
    <div className="form-container">
      <h1>Cadastro de Contas</h1>
      <form id="formCadastro" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome*</label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={nome}
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-Mail*</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Digite seu email"
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="idFilial">Filial*</label>
          <select name="idFilial" id="idFilial" onChange={onChange} required>
            <option value="">Selecione uma filial...</option>
            {filiais.map((filial) => (
              <option key={filial.id} value={filial.id}>
                {filial.numero} - {filial.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha*</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            required
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Registrar"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Cadastrar;
