import { Card as CardRoot, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Form as FormRoot, FormControl, FormDescription, FormField, FormItem, FormFieldArray, FormLabel, FormMessage } from '../components/ui/form'
import { PinInput as PinInputRoot, PinInputGroup, PinInputInput, PinInputSeparator } from '../components/ui/pin-input'

export { Button } from '../components/ui/button'
export { Separator } from '../components/ui/separator'
export { Input } from '../components/ui/input'

export const PinInput = {
  Root: PinInputRoot,
  Group: PinInputGroup,
  Input: PinInputInput,
  Separator: PinInputSeparator
} as {
  Root: typeof PinInputRoot,
  Group: typeof PinInputGroup,
  Input: typeof PinInputInput,
  Separator: typeof PinInputSeparator
}

export const Card = {
  Root: CardRoot,
  Content: CardContent,
  Description: CardDescription,
  Footer: CardFooter,
  Header: CardHeader,
  Title: CardTitle
} as {
  Root: typeof CardRoot,
  Content: typeof CardContent,
  Description: typeof CardDescription,
  Footer: typeof CardFooter,
  Header: typeof CardHeader,
  Title: typeof CardTitle
}

export const Form = {
  Root: FormRoot,
  Control: FormControl,
  Description: FormDescription,
  Field: FormField,
  Item: FormItem,
  FieldArray: FormFieldArray,
  Label: FormLabel,
  Message: FormMessage,
} as {
  Root: typeof FormRoot
  Control: typeof FormControl
  Description: typeof FormDescription
  Field: typeof FormField
  Item: typeof FormItem
  FieldArray: typeof FormFieldArray
  Label: typeof FormLabel
  Message: typeof FormMessage
}
