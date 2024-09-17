$SadContentFiles = Get-ChildItem -Path '.\src\assets\sad-content' -Name 'sad*' -File

$SadContentMapArray = @($SadContentFiles | ForEach-Object { $i = 0 } {
  @{
    id = $i
    title = [regex]::Matches($_, 'sad_\d+_(.+)\.txt').Groups[1].Value
    content = $_.ToString()
  }; $i++ })
$SadContentMapArray

$SadNotice = Get-Content -Path '.\src\assets\sad-notice.txt' | Out-String
if ($SadNotice) { $SadNotice = 'NOTICE: ' + $SadNotice}

$SadMap = @{
  notice = $SadNotice
  disclaimer = Get-Content -Path '.\src\assets\sad-disclaimer.txt' | Out-String
  updates = Get-Content -Path '.\src\assets\sad-updates.txt' | Out-String
  references = Get-Content -Path '.\src\assets\sad-references.txt' | Out-String
  sads = $SadContentMapArray
}
$SadMapJson = ($SadMap | ConvertTo-Json)

New-Item -Path '.\src\assets\sad-map.json' -ItemType 'file' -Value $SadMapJson -Force

Write-Host $SadMapJson