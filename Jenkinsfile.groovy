node {
    // Nastaví nástroj Node.js, který jste definovali v Jenkins "Tools"
    def nodejsHome = tool name: 'nodejs', type: 'nodejs'
    env.PATH = "${nodejsHome}/bin:${env.PATH}"

    sh "node --version"
    sh "pnpm --version"

    try {
        stage('Download GIT') {
            checkout scm
        }
        stage('Install Dependencies') {
            // Spustí pnpm install
            sh 'pnpm install'
        }

        stage('Build') {
            // Načte environmentální proměnné a spustí build
            configFileProvider([configFile(fileId: 'anime-next', targetLocation: '.env.production')]) {
                sh 'pnpm run build'
            }
        }

        stage('Build Docker Image') {
            // Vytvoří Docker image s názvem 'your-docker-image-name:latest'
            sh 'docker build -t anime-next .'
        }

        stage('Run Docker Container') {
            script {
                // Zastaví a odstraní předchozí kontejner, pokud existuje
                sh 'docker rm -f anime-next || true'
                // Spustí nový kontejner
                sh 'docker run -d --name anime-next -p 81:3000 -l com.sove.projekt=anime -l com.sove.jazyk=next --network proxyNet --restart unless-stopped anime-next'
            }
        }

        stage('Post Build') {
            echo 'Build and Docker setup successful!'
        }

//         post {
//             always {
//                 // Uklidit staré kontejnery a obrazy, pokud je potřeba
//                 script {
//                     sh 'docker system prune -f'
//                 }
//             }
//         }
    } catch (Exception e) {
        stage('Post Build') {
            echo 'Build failed!'
            throw e // Zajistí, že stav buildu bude označen jako FAILED
        }
    }
}