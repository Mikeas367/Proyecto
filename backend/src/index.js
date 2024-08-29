import app from './app.js'
import {sequelize} from './database/database.js'


const port = 3001

async function main() {
    try {
        await sequelize.sync()
        console.log('Se conectó exitosamente a la DB')
        app.listen(port)
        console.log(`Server corriendo en el puerto: ${port}`)

    } catch (error) {
        console.log('Error conectando a la DB', error)
    }
}

main();