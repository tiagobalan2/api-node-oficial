const { escape } = require('sequelize/lib/sql-string');
const { Endereco } = require('../models');
const axios = require('axios')

// criacao de um novo endereco
exports.createEndereco = async (req, res) => {
    try{
        const { Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE } = req.body;
        const novoEndereco = await Endereco.create({
            Cep,
            Logradouro,
            Numero,
            Complemento,
            Bairro,
            Cidade,
            Estado,
            MunicipioIBGE,
        });

        res.status(201).json(novoEndereco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar endereco', details: error.message });
    }
};


// método novo na controller que recebe o cep, consulta ele no via cep e cadastra o endereco no banco de dados
exports.createEnderecoViaCep = async (req, res) => {
    const cep = req.params.cep; // pega o cep da url e passa pra variavel cep

    try{
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`) //faz a requisicao para a api viacep

        if (response.data.erro) {
            // Trata o caso em que o CEP não é encontrado
            return res.status(404).send('CEP não encontrado');
        }

        const { logradouro, complemento, bairro, localidade, uf } = response.data;

        const novoCep = await Endereco.create({ // criando novo endereço com os dados da resposta
            Cep : cep,
            Logradouro : logradouro,
            Numero: complemento,
            Complemento : complemento,
            Bairro : bairro,               
            Cidade : localidade,
            Estado : uf,
            MunicipioIBGE : localidade
            });
        res.status(201).json(novoCep);
    } catch(error) {
        console.error('Erro ao salvar no banco de dados: ', error)
        res.status(500).send('Erro ao salvar no banco');    
    }
}


// leitura de todos os enderecos
exports.getAllEnderecos = async (req, res) => {
    try {
        const enderecos = await Endereco.findAll();
        res.status(200).json(enderecos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar enderecos', details: error.message});
    }
};

// leitura de um endereco por id
exports.getEnderecoById = async (req, res) => {
    try {
        const { Id } = req.params;
        const endereco = await Endereco.findByPk(Id);
        
        if(!endereco) {
            return res.status(404).json({ error: 'Endereco não encontrado' });
        }

        res.status(200).json(endereco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar endereco', details: error.message});
    }
}

// atualizacao de um endereco
exports.updateEndereco = async (req, res) => {
    try {
        const { Id } = req.params;
        const { Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE } = req.body;
        
        const endereco = await Endereco.findByPk(Id);

        if (!endereco) {
            return res.status(404).json({ error: 'Endereco não encontrado '});
        }

        endereco.Cep = Cep;
        endereco.Logradouro = Logradouro;
        endereco.Numero = Numero;
        endereco.Complemento = Complemento;
        endereco.Bairro = Bairro
        endereco.Cidade = Cidade;
        endereco.Estado = Estado;
        endereco.MunicipioIBGE = MunicipioIBGE;

        await endereco.save();

        res.status(200).json(endereco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar endereço ', details: error.message });
    }
};

// exclusão de um endereco
exports.deleteEndereco = async (req, res) => {
    try {
        const { Id } = req.params;

        const endereco = await Endereco.findByPk(Id);

        if(!endereco) {
            return res.status(404).json({ error: 'Endereco não encontrado '});
        }

        await endereco.destroy();

        res.status(204).send(); // sem conteudo, pois foi deletado com sucesso
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar endereco', details: error.message });
    }
};





































