import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {a11yDark} from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CODE = "version: 2.1\n" +
  "\n" +
  "orbs:\n" +
  "  node: circleci/node@3.0.0\n" +
  "\n" +
  "jobs:\n" +
  "  build:\n" +
  "    working_directory: ~/mern-starter\n" +
  "    # Reuse Docker container specification given by the node Orb\n" +
  "    executor: node/default\n" +
  "    steps:\n" +
  "      - checkout\n" +
  "      # Install the latest npm - the node Orb takes care of it\n" +
  "      - node/install-npm\n" +
  "      # Install dependencies - the node Orb take care of installation and dependency caching\n" +
  "      - node/install-packages:\n" +
  "          app-dir: ~/mern-starter\n" +
  "          cache-path: node_modules\n" +
  "          override-ci-command: npm i\n" +
  "      # Save workspace for subsequent jobs (i.e. test)\n" +
  "      - persist_to_workspace:\n" +
  "          root: .\n" +
  "          paths:\n" +
  "            - .\n" +
  "\n" +
  "  test:\n" +
  "    docker:\n" +
  "      # The primary container is an instance of the first image listed. The job's commands run in this container.\n" +
  "      - image: cimg/node:current\n" +
  "      # The secondary container is an instance of the second listed image which is run in a common network where ports exposed on the primary container are available on localhost.\n" +
  "      - image: mongo:4.2\n" +
  "    steps:\n" +
  "      # Reuse the workspace from the build job\n" +
  "      - attach_workspace:\n" +
  "          at: .\n" +
  "      - run:\n" +
  "          name: Demonstrate that Mongo DB is available as localhost\n" +
  "          command: |\n" +
  "            curl -sSJL https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -\n" +
  "            echo \"deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse\" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list\n" +
  "            sudo apt update\n" +
  "            sudo apt install mongodb-org\n" +
  "            mongo localhost --eval \"db.serverStatus()\"\n" +
  "      - run:\n" +
  "          name: Test\n" +
  "          command: npm test\n" +
  "      - run:\n" +
  "          name: Generate code coverage\n" +
  "          command: './node_modules/.bin/nyc report --reporter=text-lcov'\n" +
  "      # You can specify either a single file or a directory to store as artifacts\n" +
  "      - store_artifacts:\n" +
  "          path: test-results.xml\n" +
  "          destination: deliverable.xml\n" +
  "      - store_artifacts:\n" +
  "          path: coverage\n" +
  "          destination: coverage\n" +
  "\n" +
  "workflows:\n" +
  "  build_and_test:\n" +
  "    jobs:\n" +
  "      - build\n" +
  "      - test:\n" +
  "          requires:\n" +
  "            - build\n"


const Config = () => {
  return (
    <div className={"h-[700px] overflow-auto no-scrollbar"}>
      <SyntaxHighlighter
        language={"yaml"}
        style={a11yDark}
        wrapLines={true}
      >
        {CODE}
      </SyntaxHighlighter>
    </div>
  )
}

export default Config