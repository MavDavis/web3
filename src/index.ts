import { ethers } from "ethers";
import Counter from "../artifacts/contracts/Counter.sol/Counter.json"

async function hasSigners(): Promise<boolean> {
    //@ts-ignore
    const metamask = window.ethereum;
    const signers = await (metamask.request({method: 'eth_accounts'}) as Promise<string[]>);
    return signers.length > 0;
}

async function requestAccess(): Promise<boolean> {
    //@ts-ignore
    const result = (await window.ethereum.request({ method: 'eth_requestAccounts' })) as string[];
    return result && result.length > 0;
}

async function getContract() {
    const address = process.env.CONTRACT_ADDRESS;

    if (!(await hasSigners()) && !(await requestAccess())) {
        console.log("You are in trouble, no one wants to play");
    }

    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum).getSigner()
    const contract = new ethers.Contract(
        address,
        Counter.abi, // abi
        provider
    );

    main(contract);
}

async function currentChain(): Promise<boolean> {
    //@ts-ignore
    return (await window.ethereum.request({ method: 'eth_chainId' })) as string;
}
async function main(contract) {
    const val = await contract.getCounter();
  
    // Create container
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <p id="counter">${val}</p>
        <button id="increaseBtn">Increase Count</button>
      </div>
    `;
  
    // Clear and append to body
    document.body.innerHTML = '';
    document.body.appendChild(el);
  
    // Add event listener for the button
    document.getElementById('increaseBtn')?.addEventListener('click', async () => {
      const tx = await contract.count();
      contract.on(contract.filters.CounterInc(),function(count){

        document.getElementById('counter')!.textContent = count;
      })
      //  const newVal = await contract.getCounter();
    });
  }
  
  
console.log("Connected to chain:", currentChain());
 
getContract();