/**
 * 🧚‍♀️ How to access:
 *     - Plugin: vanilla
 *     - import { getMergedStr, getMergedObj } from '@ace/getMerged'
 */



/**
 * - Helpful when you'd like to merge a deault prop w/ a request prop
 * - Example: IF `example1 example2` is requested the result will be `ace-lottie example1 example2`
 * @example
  ```
  const Lottie = (props: {
    src: string,
    config?: LottieConfig
    $canvas?: JSX.HTMLAttributes<HTMLCanvasElement>,
  }) => {
    return <>
      <canvas {...props.$canvas} class={getMergedStr('ace-lottie', props.$canvas?.class)} />
    </>
  }
  ```
 * @param baseStr - The prop value we would always love present
 * @param reqStr - Optional, IF defined the prop that is merged w/ the base prop
 * @returns - Merged props
 */
export function getMergedStr(baseStr: string, reqStr?: string): string {
  return reqStr ? `${baseStr} ${reqStr}` : baseStr
}



/**
 * Helpful when you'd love to merge an object a very specific way
 * @param props.base - Default object
 * @param props.request - Optional, IF an object THEN we merge into base, IF duplicates request args win
 * @param props.required -  Optional, IF an object THEN we merge into (base + request), IF duplicates required args win
 * @example
  ```ts
  // before
  const _config = {
    ...defaultLottieConfig,
    ...config,
    canvas: el,
    src: buildOrigin + src,
  }

  // after
  const _config = getMergedObj({
    base: defaultLottieConfig,
    request: props.config,
    required: {
      canvas: el,
      src: buildOrigin + src,
    }
  })
  ```
 * @returns Merged object
 */
export function getMergedObj<T_Obj extends Record<string, any>, T_Request = any, T_Required = any>(props: {
  base: T_Obj,
  request?: T_Request,
  required?: T_Required
}): T_Obj & T_Request & T_Required {
  const base = (props.base && typeof props.base === 'object') ? props.base : {} as T_Obj
  const request = (props.request && typeof props.request === 'object') ? props.request : {} as T_Request
  const required = (props.required && typeof props.required === 'object') ? props.required : {} as T_Required

  return Object.assign({}, base, request, required) // the first arg to Object.assign gets mutated, {} avoids us mutating props.base
}
