
const config = {
PORT:process.env.PORT || 3000,
DB:process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/notes-app'
}

export const { PORT,DB } = config;