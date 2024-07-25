import { AsyncApiProps as ComponentProps } from "@asyncapi/react-component";

interface SecretsContext {
  token: string,
  userId: string,
  apiVersion: string,
  managementApiUrl: string,
  parentLocation: {
    host?: string,
    hostname?: string,
    href?: string,
    origin?: string,
    pathname?: string,
    port?: string,
    protocol?: string,
    search?: string,
  }
}
export interface AsyncApiProps {
  context: SecretsContext,
  componentProps: ComponentProps
}