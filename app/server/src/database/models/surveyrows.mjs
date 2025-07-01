import { DataTypes, Model} from 'sequelize'

class SurveyRows extends Model 
{
    static Initialize(sequelize)
    {
        SurveyRows.init(
            {
                fullname: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                    allowNull: false,
                    validate: {
                        len: [5, 20],
                    }
                },
                major: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                favorite_fpl: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        len: [1, 20],
                    }
                },
                prefer_foip: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            },
            {
                sequelize,
                modelName: 'SurveyRows'
            }
        )
    }
}

export default SurveyRows;