import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Cadastrar = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { registraUsuario, error, limpaErros, user } = authContext;
  const history = useHistory();

  useEffect(() => {
    if (user.filial.numero !== "1234") {
      history.push("/");
    }
    if (error != null) {
      setAlert(error, "danger");
      limpaErros();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, history]);

  const filiais = [
    { id: "27", nome: "São Luiz - Oliveira Paiva" },
    { id: "28", nome: "São Luiz - Outro" },
  ];

  const [userFormData, setUser] = useState({
    nome: "",
    email: "",
    password: "",
    numeroFilial: "",
  });

  const { nome, email, password, numeroFilial } = userFormData;
  const onChange = (e) =>
    setUser({ ...userFormData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const resp = await registraUsuario({
      nome,
      email,
      password,
      numeroFilial,
    });
    if (resp !== undefined) {
      setAlert(resp.mensagem, resp.tipo);
      limpaErros();
      document.getElementById("numeroFilial").value = "";
      setUser({
        nome: "",
        email: "",
        password: "",
        numeroFilial: "",
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
          <label htmlFor="numeroFilial">Filial*</label>
          <select
            name="numeroFilial"
            id="numeroFilial"
            onChange={onChange}
            required
          >
            <option value="">Selecione uma filial...</option>
            {filiais.map((filial) => (
              <option key={filial.id} value={filial.id}>
                {filial.id} - {filial.nome}
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
