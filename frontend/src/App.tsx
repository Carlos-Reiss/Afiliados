import "./App.css";
import { CustomDropzone } from "./components/CustomDropzone";
import { TransactionsList } from "./components/TransactionsList";
import { TransactionProvider } from "./context/TransactionContext";

function App() {
  return (
    <TransactionProvider>
      <div className="container">
        <div className="half">
          <CustomDropzone />
        </div>
        <div className="half">
          <TransactionsList />
        </div>
      </div>
    </TransactionProvider>
  );
}

export default App;
