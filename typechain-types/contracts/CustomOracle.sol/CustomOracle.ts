/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export interface CustomOracleInterface extends utils.Interface {
  functions: {
    "expiryAvailable(uint256)": FunctionFragment;
    "expiryDatePrice(uint256)": FunctionFragment;
    "getExpiryPriceLevel(uint256)": FunctionFragment;
    "makeCorrection(uint256,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "setExpiryPrice(uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "expiryAvailable"
      | "expiryDatePrice"
      | "getExpiryPriceLevel"
      | "makeCorrection"
      | "owner"
      | "setExpiryPrice"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "expiryAvailable",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "expiryDatePrice",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getExpiryPriceLevel",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "makeCorrection",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setExpiryPrice",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "expiryAvailable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "expiryDatePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getExpiryPriceLevel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "makeCorrection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setExpiryPrice",
    data: BytesLike
  ): Result;

  events: {};
}

export interface CustomOracle extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CustomOracleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    expiryAvailable(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    expiryDatePrice(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getExpiryPriceLevel(
      _expiry: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    makeCorrection(
      _expiry: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    setExpiryPrice(
      _expiry: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  expiryAvailable(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  expiryDatePrice(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getExpiryPriceLevel(
    _expiry: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  makeCorrection(
    _expiry: BigNumberish,
    _price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  setExpiryPrice(
    _expiry: BigNumberish,
    _price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    expiryAvailable(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    expiryDatePrice(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getExpiryPriceLevel(
      _expiry: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    makeCorrection(
      _expiry: BigNumberish,
      _price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    setExpiryPrice(
      _expiry: BigNumberish,
      _price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    expiryAvailable(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    expiryDatePrice(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getExpiryPriceLevel(
      _expiry: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    makeCorrection(
      _expiry: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    setExpiryPrice(
      _expiry: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    expiryAvailable(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    expiryDatePrice(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getExpiryPriceLevel(
      _expiry: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    makeCorrection(
      _expiry: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setExpiryPrice(
      _expiry: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
