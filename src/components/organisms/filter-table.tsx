import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";

const FilterTable = () => {
  return (
    <div className={"flex space-x-3"}>
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a module" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sas">SAS</SelectItem>
          <SelectItem value="appModule">App Module</SelectItem>
          <SelectItem value="deployment-unit">Deployment Unit</SelectItem>
          <SelectItem value="deployment-unit-version">Deployment Unit Version</SelectItem>
          <SelectItem value="deployment">Deployment</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="success">Success</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
          <SelectItem value="started">Started</SelectItem>
        </SelectContent>
      </Select>
      <Button>
        Filter
      </Button>
    </div>
  )
}

export default FilterTable