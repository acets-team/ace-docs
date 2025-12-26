import { Route } from '@ace/route'
import { Async } from '@ace/async'
import { r2Url } from '@ace/r2Url'
import { Submit } from '@ace/submit'
import { vApiInfo } from '@ace/vParser'
import { Messages } from '@ace/messages'
import { useScope } from '@ace/useScope'
import { dateRead } from '@ace/dateRead'
import { createSignal, For } from 'solid-js'
import type { Async2ResData } from '@ace/types'
import { createOnSubmit } from '@ace/createOnSubmit'
import { showToast, showErrorToast } from '@ace/toast'
import apiFormData, { info } from '@src/api/apiFormData'
import apiReadableStream from '@src/api/apiReadableStream'
import apiGetList, { info as apiGetListInfo } from '@src/api/apiGetList'
import apiRemoveImg, { info as apiRemoveImgInfo } from '@src/api/apiRemoveImg'


export default new Route('/partners')
  .component(() => {
    return <>
      <ReadableStreamExample />
      <RemoveExample />
      <FormDataExample />
      <ListExample />
      <img src={r2Url({ key: 'sloths.jpg' })} />
    </>
  })


function ReadableStreamExample() {
  const scope = useScope()
  const useApiReadableStream = new Async(apiReadableStream)

  const onSubmit = createOnSubmit(async ({ fd }) => {
    const file = fd('picture')
    if (!(file instanceof File)) return scope.messages.set({ name: 'picture', value: 'Please upload a picture' })

    const res = await useApiReadableStream.run({ file, pathParams: { key: file.name } })

    if (res.error?.message) showErrorToast(res.error.message)
    else showToast({ value: 'Uploaded!', type: 'success' })
  })

  return <>
    <form onSubmit={onSubmit}>
      <input name="picture" type="file" />

      {/* On ApiInfo validation, anyone of these ApiInfo parser keys may have an error */}
      {/* B/c they all apply to this input, we place these <Messages/> components by this input */}
      <Messages name="picture" />
      <Messages name="headers.content-type" />
      <Messages name="headers.content-length" />

      {/* Will show a loading spinner while useApiReadableStream has a status of 'loading' */}
      <Submit hook={useApiReadableStream} label="Save" $button={{ class: 'brand' }} />
    </form>
  </>
}



function FormDataExample() {
  const useApiFormData = new Async(apiFormData)

  const onSubmit = createOnSubmit(async ({ fd }) => {
    const img = fd('img')

    const formData = vApiInfo.formData(info.parser, {
      img,
      key: img instanceof File ? img.name : undefined,
    })

    const res = await useApiFormData.run({ formData })

    if (res.error?.message) showErrorToast(res.error.message)
    else showToast({ value: 'Uploaded!', type: 'success' })
  })

  return <>
    <form onSubmit={onSubmit}>
      <input name="img" type="file" />
      <Messages name="img" /> {/* img errors provided here */}
      <Submit hook={useApiFormData} label="Save" $button={{ class: 'brand' }} /> {/* Shows a loading spinner when useApiFormData has a status of 'loading' */}
    </form>
  </>
}



function RemoveExample() {
  const useApiRemoveImg = new Async(apiRemoveImg)

  const onRemoveImg = createOnSubmit(async ({ fd }) => {
    const pathParams = vApiInfo.pathParams(apiRemoveImgInfo.parser, {
      key: fd('key')
    })

    const res = await useApiRemoveImg.run({ pathParams })

    if (res.error?.message) showErrorToast(res.error.message)
    else showToast({ value: 'Removed!', type: 'success' })
  })

  return <>
    <form onSubmit={onRemoveImg}>
      <input name="key" type="text" placeholder="Remove Key" />
      <Messages name="key" />
      <Submit hook={useApiRemoveImg} label="Save" $button={{ class: 'brand' }} />
    </form>
  </>
}




function ListExample() {
  const useApiListR2 = new Async(apiGetList)

  const [list, setList] = createSignal<Async2ResData<typeof useApiListR2>>()

  const onSubmit = createOnSubmit(async ({ fd }) => {
    const searchParams = vApiInfo.searchParams(apiGetListInfo.parser, {
      limit: fd('limit') || undefined,
      prefix: fd('prefix') || undefined,
      cursor: fd('cursor') || undefined,
      include: fd('include') || undefined,
      delimiter: fd('delimiter') || undefined,
      startAfter: fd('startAfter') || undefined
    })

    const res = await useApiListR2.run({ searchParams })

    if (res.error?.message) showErrorToast(res.error.message)
    else if (res.data) {
      setList(res.data)
      showToast({ value: 'Success!', type: 'success' })
    }
  })

  return <>
    <form onSubmit={onSubmit}>
      <div>
        <input name="limit" type="number" placeholder="Limit" />
        <Messages name="limit" />
      </div>

      <div>
        <input name="prefix" type="text" placeholder="Prefix" />
        <Messages name="prefix" />
      </div>

      <div>
        <input name="cursor" type="text" placeholder="Cursor" />
        <Messages name="cursor" />
      </div>

      <div>
        <input name="delimiter" type="text" placeholder="Delimiter" />
        <Messages name="delimiter" />
      </div>

      <div>
        <input name="startAfter" type="text" placeholder="Start After" />
        <Messages name="startAfter" />
      </div>

      <fieldset>
        <legend>Include:</legend>

        <div>
          <input type="checkbox" id="httpMetadata" name="include" value="httpMetadata" checked />
          <label for="httpMetadata">Http Metadata</label>
        </div>

        <div>
          <input type="checkbox" id="customMetadata" name="include" value="customMetadata" />
          <label for="customMetadata">Custom Metadata</label>
        </div>
      </fieldset>
      <Messages name="include" />
      
      <Submit hook={useApiListR2} label="Get" $button={{ class: 'brand' }} />
    </form>

    <For each={list()}>{
      (item) => <>
        <div>
          <h1>key: {item.key}</h1>
          <div>etag: {item.etag}</div>
          <div>httpEtag: {item.httpEtag}</div>
          <div>uploaded: {dateRead({ date: item.uploaded })}</div>
          <div>httpMetadata: <code>{JSON.stringify(item.httpMetadata)}</code></div>
          <div>customMetadata: <code>{JSON.stringify(item.customMetadata)}</code></div>
        </div>
      </>
    }</For>
  </>
}
