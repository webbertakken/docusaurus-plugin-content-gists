import { Joi } from "@docusaurus/utils-validation";
import type {
  ValidationSchema,
  OptionValidationContext,
  PluginOptions,
} from "@docusaurus/types";

export const defaultConfig = {
  enabled: true,
};

export const Schema = Joi.object({
  enabled: Joi.string().equal(true, false).default(defaultConfig.enabled),
})
  .label("pluginConfig")
  .default(defaultConfig);

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<ValidationSchema<PluginOptions>, PluginOptions>) {
  return validate(Schema, options);
}
