/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DAI, DAIInterface } from "../../contracts/DAI";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600381526020017f44414900000000000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4441490000000000000000000000000000000000000000000000000000000000815250816003908051906020019062000096929190620001a6565b508060049080519060200190620000af929190620001a6565b505050620000d2620000c6620000d860201b60201c565b620000e060201b60201c565b620002bb565b600033905090565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b828054620001b49062000256565b90600052602060002090601f016020900481019282620001d8576000855562000224565b82601f10620001f357805160ff191683800117855562000224565b8280016001018555821562000224579182015b828111156200022357825182559160200191906001019062000206565b5b50905062000233919062000237565b5090565b5b808211156200025257600081600090555060010162000238565b5090565b600060028204905060018216806200026f57607f821691505b602082108114156200028657620002856200028c565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6119d380620002cb6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806370a0823111610097578063a457c2d711610066578063a457c2d714610276578063a9059cbb146102a6578063dd62ed3e146102d6578063f2fde38b14610306576100f5565b806370a0823114610200578063715018a6146102305780638da5cb5b1461023a57806395d89b4114610258576100f5565b806323b872dd116100d357806323b872dd14610166578063313ce5671461019657806339509351146101b457806340c10f19146101e4576100f5565b806306fdde03146100fa578063095ea7b31461011857806318160ddd14610148575b600080fd5b610102610322565b60405161010f9190611398565b60405180910390f35b610132600480360381019061012d9190611153565b6103b4565b60405161013f919061137d565b60405180910390f35b6101506103d7565b60405161015d91906114fa565b60405180910390f35b610180600480360381019061017b9190611104565b6103e1565b60405161018d919061137d565b60405180910390f35b61019e610410565b6040516101ab9190611515565b60405180910390f35b6101ce60048036038101906101c99190611153565b610419565b6040516101db919061137d565b60405180910390f35b6101fe60048036038101906101f99190611153565b6104c3565b005b61021a6004803603810190610215919061109f565b61054d565b60405161022791906114fa565b60405180910390f35b610238610595565b005b61024261061d565b60405161024f9190611362565b60405180910390f35b610260610647565b60405161026d9190611398565b60405180910390f35b610290600480360381019061028b9190611153565b6106d9565b60405161029d919061137d565b60405180910390f35b6102c060048036038101906102bb9190611153565b6107c3565b6040516102cd919061137d565b60405180910390f35b6102f060048036038101906102eb91906110c8565b6107e6565b6040516102fd91906114fa565b60405180910390f35b610320600480360381019061031b919061109f565b61086d565b005b6060600380546103319061162a565b80601f016020809104026020016040519081016040528092919081815260200182805461035d9061162a565b80156103aa5780601f1061037f576101008083540402835291602001916103aa565b820191906000526020600020905b81548152906001019060200180831161038d57829003601f168201915b5050505050905090565b6000806103bf610965565b90506103cc81858561096d565b600191505092915050565b6000600254905090565b6000806103ec610965565b90506103f9858285610b38565b610404858585610bc4565b60019150509392505050565b60006012905090565b600080610424610965565b90506104b8818585600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546104b3919061154c565b61096d565b600191505092915050565b6104cb610965565b73ffffffffffffffffffffffffffffffffffffffff166104e961061d565b73ffffffffffffffffffffffffffffffffffffffff161461053f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105369061145a565b60405180910390fd5b6105498282610e45565b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b61059d610965565b73ffffffffffffffffffffffffffffffffffffffff166105bb61061d565b73ffffffffffffffffffffffffffffffffffffffff1614610611576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106089061145a565b60405180910390fd5b61061b6000610fa5565b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600480546106569061162a565b80601f01602080910402602001604051908101604052809291908181526020018280546106829061162a565b80156106cf5780601f106106a4576101008083540402835291602001916106cf565b820191906000526020600020905b8154815290600101906020018083116106b257829003601f168201915b5050505050905090565b6000806106e4610965565b90506000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050838110156107aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107a1906114ba565b60405180910390fd5b6107b7828686840361096d565b60019250505092915050565b6000806107ce610965565b90506107db818585610bc4565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b610875610965565b73ffffffffffffffffffffffffffffffffffffffff1661089361061d565b73ffffffffffffffffffffffffffffffffffffffff16146108e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108e09061145a565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610959576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610950906113da565b60405180910390fd5b61096281610fa5565b50565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156109dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109d49061149a565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610a4d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a44906113fa565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610b2b91906114fa565b60405180910390a3505050565b6000610b4484846107e6565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610bbe5781811015610bb0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ba79061141a565b60405180910390fd5b610bbd848484840361096d565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610c34576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c2b9061147a565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610ca4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c9b906113ba565b60405180910390fd5b610caf83838361106b565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610d35576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d2c9061143a565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610dc8919061154c565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610e2c91906114fa565b60405180910390a3610e3f848484611070565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610eb5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eac906114da565b60405180910390fd5b610ec16000838361106b565b8060026000828254610ed3919061154c565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f28919061154c565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610f8d91906114fa565b60405180910390a3610fa160008383611070565b5050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b505050565b505050565b6000813590506110848161196f565b92915050565b60008135905061109981611986565b92915050565b6000602082840312156110b157600080fd5b60006110bf84828501611075565b91505092915050565b600080604083850312156110db57600080fd5b60006110e985828601611075565b92505060206110fa85828601611075565b9150509250929050565b60008060006060848603121561111957600080fd5b600061112786828701611075565b935050602061113886828701611075565b92505060406111498682870161108a565b9150509250925092565b6000806040838503121561116657600080fd5b600061117485828601611075565b92505060206111858582860161108a565b9150509250929050565b611198816115a2565b82525050565b6111a7816115b4565b82525050565b60006111b882611530565b6111c2818561153b565b93506111d28185602086016115f7565b6111db816116ba565b840191505092915050565b60006111f360238361153b565b91506111fe826116cb565b604082019050919050565b600061121660268361153b565b91506112218261171a565b604082019050919050565b600061123960228361153b565b915061124482611769565b604082019050919050565b600061125c601d8361153b565b9150611267826117b8565b602082019050919050565b600061127f60268361153b565b915061128a826117e1565b604082019050919050565b60006112a260208361153b565b91506112ad82611830565b602082019050919050565b60006112c560258361153b565b91506112d082611859565b604082019050919050565b60006112e860248361153b565b91506112f3826118a8565b604082019050919050565b600061130b60258361153b565b9150611316826118f7565b604082019050919050565b600061132e601f8361153b565b915061133982611946565b602082019050919050565b61134d816115e0565b82525050565b61135c816115ea565b82525050565b6000602082019050611377600083018461118f565b92915050565b6000602082019050611392600083018461119e565b92915050565b600060208201905081810360008301526113b281846111ad565b905092915050565b600060208201905081810360008301526113d3816111e6565b9050919050565b600060208201905081810360008301526113f381611209565b9050919050565b600060208201905081810360008301526114138161122c565b9050919050565b600060208201905081810360008301526114338161124f565b9050919050565b6000602082019050818103600083015261145381611272565b9050919050565b6000602082019050818103600083015261147381611295565b9050919050565b60006020820190508181036000830152611493816112b8565b9050919050565b600060208201905081810360008301526114b3816112db565b9050919050565b600060208201905081810360008301526114d3816112fe565b9050919050565b600060208201905081810360008301526114f381611321565b9050919050565b600060208201905061150f6000830184611344565b92915050565b600060208201905061152a6000830184611353565b92915050565b600081519050919050565b600082825260208201905092915050565b6000611557826115e0565b9150611562836115e0565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156115975761159661165c565b5b828201905092915050565b60006115ad826115c0565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b838110156116155780820151818401526020810190506115fa565b83811115611624576000848401525b50505050565b6000600282049050600182168061164257607f821691505b602082108114156116565761165561168b565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b611978816115a2565b811461198357600080fd5b50565b61198f816115e0565b811461199a57600080fd5b5056fea264697066735822122077a3cac4e727e0b97ea661b17a5269bc31dd0997bb3c21dd98ace3f4fcb0c9f664736f6c63430008040033";

type DAIConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DAIConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DAI__factory extends ContractFactory {
  constructor(...args: DAIConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DAI> {
    return super.deploy(overrides || {}) as Promise<DAI>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DAI {
    return super.attach(address) as DAI;
  }
  override connect(signer: Signer): DAI__factory {
    return super.connect(signer) as DAI__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DAIInterface {
    return new utils.Interface(_abi) as DAIInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): DAI {
    return new Contract(address, _abi, signerOrProvider) as DAI;
  }
}
