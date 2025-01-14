import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AIAgent = sequelize.define('AIAgent', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.7
  },
  outputFormat: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'text'
  },
  maxTokens: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2048
  },
  modelId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default AIAgent;