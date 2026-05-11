import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRecordsStore = defineStore('records', () => {
  const records = ref(JSON.parse(localStorage.getItem('gso_records') || '{}'))

  function save() {
    localStorage.setItem('gso_records', JSON.stringify(records.value))
  }

  function getKey(unit, buildingCode, formId) {
    return `${unit}__${buildingCode}__${formId}`
  }

  function getRecords(unit, buildingCode, formId) {
    return records.value[getKey(unit, buildingCode, formId)] || []
  }

  function addRecord(unit, buildingCode, formId, data) {
    const key = getKey(unit, buildingCode, formId)
    if (!records.value[key]) records.value[key] = []
    records.value[key].push({ ...data, id: Date.now(), createdAt: new Date().toISOString() })
    save()
  }

  function updateRecord(unit, buildingCode, formId, id, data) {
    const key = getKey(unit, buildingCode, formId)
    const arr = records.value[key] || []
    const idx = arr.findIndex(r => r.id === id)
    if (idx !== -1) { arr[idx] = { ...arr[idx], ...data, updatedAt: new Date().toISOString() } }
    save()
  }

  function deleteRecord(unit, buildingCode, formId, id) {
    const key = getKey(unit, buildingCode, formId)
    records.value[key] = (records.value[key] || []).filter(r => r.id !== id)
    save()
  }

  function getAllByUnit(unit) {
    const result = {}
    Object.entries(records.value).forEach(([key, val]) => {
      if (key.startsWith(unit + '__')) result[key] = val
    })
    return result
  }

  return { records, getRecords, addRecord, updateRecord, deleteRecord, getAllByUnit }
})
