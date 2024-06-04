import { createConnection } from 'typeorm';
import { ConnectionOptions } from 'typeorm';

// Importe o JSON de configuração
import ormconfig from '../../../ormconfig.json'; // Ajuste o caminho conforme necessário

// Converta o JSON para ConnectionOptions
const connectionOptions: ConnectionOptions = {
  ...ormconfig,
  type: ormconfig.type as any, // Casting para ajustar o tipo
};

createConnection(connectionOptions)
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
