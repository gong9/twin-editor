import type { Operation } from 'fast-json-patch'
import jsonpatch from 'fast-json-patch'
import { message } from 'antd'
import { flatten } from 'poor-utils-pro'

interface HistoryDataType {
  [k: string]: any
}

/**
 * notes: todo some bugs need to be fixed
 */
class HistoryController {
  public baseData: HistoryDataType | HistoryDataType[]
  public patch: Operation[] | Operation[][]
  private historyStackLength: number
  private historyIndex: number
  private baseDataType: 'Object' | 'Array'

  constructor(historyStackLength = 10) {
    this.baseData = {}
    this.baseDataType = 'Object'
    this.patch = []
    this.historyStackLength = historyStackLength
    this.historyIndex = 0
  }

  public setBaseData(data: HistoryDataType) {
    this.patch = []
    this.baseDataType = Array.isArray(data) ? 'Array' : 'Object'
    this.baseData = jsonpatch.deepClone(data)
  }

  public get lastData() {
    return jsonpatch.applyPatch({ ...this.baseData }, flatten(this.patch)).newDocument
  }

  private get isTopStack() {
    return this.historyIndex === this.patch.length
  }

  private resetHistoryIndex() {
    this.historyIndex
    = this.patch.length > this.historyStackLength
        ? this.historyStackLength
        : this.patch.length
  }

  /**
   * updateBaseData, check the length of patch
   */
  private updateBaseData() {
    this.resetHistoryIndex()

    if (this.patch.length > this.historyStackLength) {
      const currentPatch = this.patch.shift() as Operation
      this.baseData = jsonpatch.applyOperation(
        { ...this.baseData },
        currentPatch,
      ).newDocument
    }
  }

  private changeHistoryStack() {
    if (!this.isTopStack)
      this.patch = this.patch.slice(0, this.historyIndex)
  }

  public add(path: string, value: unknown) {
    this.changeHistoryStack()

    this.patch.push({
      op: 'add',
      path,
      value,
    } as any)

    this.updateBaseData()
  }

  public replace(path: string, value: unknown) {
    this.changeHistoryStack()

    this.patch.push({
      op: 'replace',
      path,
      value,
    } as any)

    this.updateBaseData()
  }

  public delete(path: string) {
    this.changeHistoryStack()

    this.patch.push({
      op: 'remove',
      path,
    } as any)

    this.updateBaseData()
  }

  /**
   * don't know the patch
   * sometimes, we don't know the patch
   * @param currentData
   * @returns
   */
  public addRecord(currentData: HistoryDataType) {
    const lastData = this.lastData
    const currentSnapshotPath = jsonpatch.compare(lastData, currentData)

    this.patch.push(currentSnapshotPath as any)
    this.updateBaseData()
  }

  private getData(data: HistoryDataType | HistoryDataType[]) {
    if (this.baseDataType === 'Array') {
      const result = []
      for (const key in data)
        result.push((data as any)[key])

      return result
    }
    else {
      return data
    }
  }

  public undo() {
    if (this.historyIndex > 0) {
      const currentPatch = this.patch.slice(0, this.historyIndex - 1)
      this.historyIndex -= 1

      const currentState = jsonpatch.applyPatch({ ...this.baseData }, flatten(currentPatch))
        .newDocument

      return this.getData(currentState)
    }
    else {
      message.warning('You can\'t undo anymore')
      return this.getData({ ...this.baseData })
    }
  }
}

export default new HistoryController(10)
