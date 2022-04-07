/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Insure,
  InsureInterface,
} from "../../../contracts/Insure.sol/Insure";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_expiryDates",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "_usdAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "provider",
        type: "address",
      },
    ],
    name: "NewPolicyAvailability",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "taker",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "provider",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lots",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "policyPaid",
        type: "bool",
      },
    ],
    name: "PositionClosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "taker",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "provider",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lots",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "PositionOpened",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "activeProviderTakers",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "activeTakersPolicies",
    outputs: [
      {
        internalType: "address",
        name: "provider",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "lots",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "level",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
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
        name: "",
        type: "address",
      },
    ],
    name: "balance",
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
        name: "_address",
        type: "address",
      },
    ],
    name: "checkPolicies",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_expiry",
        type: "uint256",
      },
    ],
    name: "deleteAllProviderPolicies",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "expiryDates",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_providerAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_expiry",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_lots",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_level",
        type: "uint256",
      },
    ],
    name: "openPolicy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "oracle",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "providers",
    outputs: [
      {
        internalType: "uint256",
        name: "lots",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "level",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
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
        name: "_oracle",
        type: "address",
      },
    ],
    name: "setOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_expiry",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_lots",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_level",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "setProviderInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "usdAddress",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200202638038062002026833981810160405281019062000037919062000221565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060005b82518110156200010757600160036000858481518110620000c4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151815260200190815260200160002060006101000a81548160ff0219169083151502179055508080620000fe9062000347565b9150506200007a565b5080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505062000438565b6000620001686200016284620002a4565b6200027b565b905080838252602082019050828560208602820111156200018857600080fd5b60005b85811015620001bc5781620001a188826200020a565b8452602084019350602083019250506001810190506200018b565b5050509392505050565b600081519050620001d78162000404565b92915050565b600082601f830112620001ef57600080fd5b81516200020184826020860162000151565b91505092915050565b6000815190506200021b816200041e565b92915050565b600080604083850312156200023557600080fd5b600083015167ffffffffffffffff8111156200025057600080fd5b6200025e85828601620001dd565b92505060206200027185828601620001c6565b9150509250929050565b6000620002876200029a565b905062000295828262000311565b919050565b6000604051905090565b600067ffffffffffffffff821115620002c257620002c1620003c4565b5b602082029050602081019050919050565b6000620002e082620002e7565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6200031c82620003f3565b810181811067ffffffffffffffff821117156200033e576200033d620003c4565b5b80604052505050565b6000620003548262000307565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156200038a576200038962000395565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b6200040f81620002d3565b81146200041b57600080fd5b50565b620004298162000307565b81146200043557600080fd5b50565b611bde80620004486000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80638da5cb5b11610097578063cc24692811610066578063cc24692814610275578063ce8e80c114610291578063e3d670d7146102c1578063f4593156146102f1576100f5565b80638da5cb5b146101eb5780639e1a861314610209578063aa4bfddb14610227578063b6b55f2514610259576100f5565b80632e1a7d4d116100d35780632e1a7d4d1461016257806373db107e1461017e5780637adbf973146101b15780637dc0d1d0146101cd576100f5565b8063060491c5146100fa578063065689ab146101165780631a4334be14610146575b600080fd5b610114600480360381019061010f91906113e3565b61030d565b005b610130600480360381019061012b919061140c565b61040c565b60405161013d9190611682565b60405180910390f35b610160600480360381019061015b91906114d4565b61045a565b005b61017c600480360381019061017791906114d4565b6104c8565b005b6101986004803603810190610193919061140c565b610653565b6040516101a894939291906116fd565b60405180910390f35b6101cb60048036038101906101c691906113e3565b6106c0565b005b6101d5610792565b6040516101e29190611682565b60405180910390f35b6101f36107b8565b6040516102009190611682565b60405180910390f35b6102116107dc565b60405161021e9190611682565b60405180910390f35b610241600480360381019061023c919061140c565b610802565b60405161025093929190611858565b60405180910390f35b610273600480360381019061026e91906114d4565b610839565b005b61028f600480360381019061028a9190611448565b610944565b005b6102ab60048036038101906102a691906114d4565b610fb7565b6040516102b89190611742565b60405180910390f35b6102db60048036038101906102d691906113e3565b610fd7565b6040516102e8919061183d565b60405180910390f35b61030b600480360381019061030691906114fd565b610fef565b005b60005b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490508110156104085742600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002082815481106103d2577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002090600402016003015410156103f5576103f48282611081565b5b8080610400906119cc565b915050610310565b5050565b6006602052816000526040600020818154811061042857600080fd5b906000526020600020016000915091509054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082815260200190815260200160002060008082016000905560018201600090556002820160009055505050565b80600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561054a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105419061181d565b60405180910390fd5b80600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105999190611950565b92505081905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b81526004016105fd9291906116d4565b602060405180830381600087803b15801561061757600080fd5b505af115801561062b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061064f91906114ab565b5050565b6005602052816000526040600020818154811061066f57600080fd5b9060005260206000209060040201600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154905084565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461074e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610745906117bd565b60405180910390fd5b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6007602052816000526040600020602052806000526040600020600091509150508060000154908060010154908060020154905083565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b81526004016108989392919061169d565b602060405180830381600087803b1580156108b257600080fd5b505af11580156108c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108ea91906114ab565b5080600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461093a91906118a0565b9250508190555050565b81600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008581526020019081526020016000206000015410156109da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109d19061175d565b60405180910390fd5b80600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008581526020019081526020016000206001015414610a6f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a669061179d565b60405180910390fd5b606482610a7c91906118f6565b600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205411610afc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610af3906117fd565b60405180910390fd5b81600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060020154610b5b91906118f6565b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205411610bdb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bd29061177d565b60405180910390fd5b600115156003600085815260200190815260200160002060009054906101000a900460ff16151514610c42576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c39906117dd565b60405180910390fd5b8082610c4e91906118f6565b600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610c9c9190611950565b92505081905550600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008481526020019081526020016000206002015482610d0291906118f6565b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610d509190611950565b9250508190555081600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060020154610db691906118f6565b600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610e0491906118a0565b92505081905550600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020849080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060405180608001604052808673ffffffffffffffffffffffffffffffffffffffff16815260200184815260200183815260200185815250908060018154018082558091505060019003906000526020600020906004020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015560608201518160030155505050505050565b60036020528060005260406000206000915054906101000a900460ff1681565b60046020528060005260406000206000915090505481565b604051806060016040528084815260200183815260200182815250600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086815260200190815260200160002060008201518160000155602082015181600101556040820151816002015590505050505050565b6000606c905080600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002083815481106110ff577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000209060040201600201541015611206576064600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208381548110611190577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000209060040201600101546111ac91906118f6565b600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546111fa91906118a0565b9250508190555061139f565b6000600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020838154811061127f577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020906004020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506064600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020848154811061132c577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002090600402016001015461134891906118f6565b600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461139691906118a0565b92505081905550505b505050565b6000813590506113b381611b63565b92915050565b6000815190506113c881611b7a565b92915050565b6000813590506113dd81611b91565b92915050565b6000602082840312156113f557600080fd5b6000611403848285016113a4565b91505092915050565b6000806040838503121561141f57600080fd5b600061142d858286016113a4565b925050602061143e858286016113ce565b9150509250929050565b6000806000806080858703121561145e57600080fd5b600061146c878288016113a4565b945050602061147d878288016113ce565b935050604061148e878288016113ce565b925050606061149f878288016113ce565b91505092959194509250565b6000602082840312156114bd57600080fd5b60006114cb848285016113b9565b91505092915050565b6000602082840312156114e657600080fd5b60006114f4848285016113ce565b91505092915050565b6000806000806080858703121561151357600080fd5b6000611521878288016113ce565b9450506020611532878288016113ce565b9350506040611543878288016113ce565b9250506060611554878288016113ce565b91505092959194509250565b61156981611984565b82525050565b61157881611996565b82525050565b600061158b600f8361188f565b915061159682611a44565b602082019050919050565b60006115ae601b8361188f565b91506115b982611a6d565b602082019050919050565b60006115d160158361188f565b91506115dc82611a96565b602082019050919050565b60006115f460168361188f565b91506115ff82611abf565b602082019050919050565b600061161760198361188f565b915061162282611ae8565b602082019050919050565b600061163a601e8361188f565b915061164582611b11565b602082019050919050565b600061165d60208361188f565b915061166882611b3a565b602082019050919050565b61167c816119c2565b82525050565b60006020820190506116976000830184611560565b92915050565b60006060820190506116b26000830186611560565b6116bf6020830185611560565b6116cc6040830184611673565b949350505050565b60006040820190506116e96000830185611560565b6116f66020830184611673565b9392505050565b60006080820190506117126000830187611560565b61171f6020830186611673565b61172c6040830185611673565b6117396060830184611673565b95945050505050565b6000602082019050611757600083018461156f565b92915050565b600060208201905081810360008301526117768161157e565b9050919050565b60006020820190508181036000830152611796816115a1565b9050919050565b600060208201905081810360008301526117b6816115c4565b9050919050565b600060208201905081810360008301526117d6816115e7565b9050919050565b600060208201905081810360008301526117f68161160a565b9050919050565b600060208201905081810360008301526118168161162d565b9050919050565b6000602082019050818103600083015261183681611650565b9050919050565b60006020820190506118526000830184611673565b92915050565b600060608201905061186d6000830186611673565b61187a6020830185611673565b6118876040830184611673565b949350505050565b600082825260208201905092915050565b60006118ab826119c2565b91506118b6836119c2565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156118eb576118ea611a15565b5b828201905092915050565b6000611901826119c2565b915061190c836119c2565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561194557611944611a15565b5b828202905092915050565b600061195b826119c2565b9150611966836119c2565b92508282101561197957611978611a15565b5b828203905092915050565b600061198f826119a2565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006119d7826119c2565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611a0a57611a09611a15565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e6f7420656e6f756768206c6f74730000000000000000000000000000000000600082015250565b7f54616b657320686173206e6f7420656e6f7567682066756e64732e0000000000600082015250565b7f57726f6e6720696e737572616e6365206c6576656c0000000000000000000000600082015250565b7f4f6e6c79206f776e65722063616e20646f207468697300000000000000000000600082015250565b7f4578706972792064617465206973206e6f742076616c69642e00000000000000600082015250565b7f50726f766964657220686173206e6f7420656e6f7567682066756e64732e0000600082015250565b7f576974686472617720616d6f756e7420657863656564732062616c616e63652e600082015250565b611b6c81611984565b8114611b7757600080fd5b50565b611b8381611996565b8114611b8e57600080fd5b50565b611b9a816119c2565b8114611ba557600080fd5b5056fea2646970667358221220181cc89b4af2c9811ea565db4a5a1737364d7722fa7d8c5d4afdd80fb7ed7ce564736f6c63430008040033";

type InsureConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: InsureConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Insure__factory extends ContractFactory {
  constructor(...args: InsureConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _expiryDates: BigNumberish[],
    _usdAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Insure> {
    return super.deploy(
      _expiryDates,
      _usdAddress,
      overrides || {}
    ) as Promise<Insure>;
  }
  override getDeployTransaction(
    _expiryDates: BigNumberish[],
    _usdAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _expiryDates,
      _usdAddress,
      overrides || {}
    );
  }
  override attach(address: string): Insure {
    return super.attach(address) as Insure;
  }
  override connect(signer: Signer): Insure__factory {
    return super.connect(signer) as Insure__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): InsureInterface {
    return new utils.Interface(_abi) as InsureInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Insure {
    return new Contract(address, _abi, signerOrProvider) as Insure;
  }
}
