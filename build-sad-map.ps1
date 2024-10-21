function Get-MtcbrrEntryArray($FileExtension, $StartingId) {
  $MtcbrrFiles = Get-ChildItem -Path '.\src\assets\mtcbrrs' -Name ('mtcbrr*' + $FileExtension) -File
  $MtcbrrEntryArray = @($MtcbrrFiles | ForEach-Object { $i = 0 } {
    @{
      id = $StartingId + $i
      title = [regex]::Matches($_, ('mtcbrr_\d+_(.+)\' + $FileExtension)).Groups[1].Value
      location = Join-Path -Path 'mtcbrrs' -ChildPath $_.ToString()
    }; $i++ })
  $MtcbrrEntryArray
}

function Add-LovEntryMap($LovMap, $LovFile, $LovFileRegex) {
    $LovFileMatches = [regex]::Matches($LovFile, $LovFileRegex)
    $LovDate = $LovFileMatches.Groups[1].Value
    $LovValue = $LovFileMatches.Groups[2].Value
    if(!$LovMap.ContainsKey($LovDate)) {
      $LovMap.Add($LovDate, [System.Collections.ArrayList]::new())
    }
    $LovMap[$LovDate].Add($LovValue)
    $LovMap
}

function main {
  # Moontide Crossbridge Revelry
  $SadMtcbrrArray = Get-MtcbrrEntryArray -FileExtension '.txt' -StartingId 0

  # Moontide Crossbridge Revelry drafts
  $SadMtcbrrDraftArray = Get-MtcbrrEntryArray -FileExtension '.draft' -StartingId $SadMtcbrrArray.Count

  # Logs of Vates
  $SadLovMap = @{}
  $SadLovFiles = Get-ChildItem -Path '.\src\assets\lovs' -Recurse -Include '*.jpg' -File  | % { $_.FullName } | Resolve-Path -Relative
  foreach($SadLovFile in $SadLovFiles) {
    Add-LovEntryMap -LovMap $SadLovMap -LovFile $SadLovFile -LovFileRegex '\.\\src\\assets\\lovs\\(\d+)\\(\d+\.jpg)'
  }
  $SadLovReferenceFiles = Get-ChildItem -Path '.\src\assets\lovs' -Recurse -Include '*.txt' -File  | % { $_.FullName } | Resolve-Path -Relative
  foreach($SadLovReferenceFile in $SadLovReferenceFiles) {
    Add-LovEntryMap -LovMap $SadLovMap -LovFile $SadLovReferenceFile -LovFileRegex '\.\\src\\assets\\lovs\\(\d+)\\(\w+\.txt)'
  }
  $SadLovArray = @($SadLovMap.GetEnumerator() | ForEach-Object { $i = 0 } {
    $Key = $_.Key
    @{
      id = $i
      title = ([DateTime]::Parse('1970-01-01T00:00:00Z').AddTicks(([long]$Key) * 10000)).ToShortDateString()
      location = @($_.Value | ForEach-Object {
        Join-Path -Path (Join-Path -Path 'lovs' -ChildPath $Key) -ChildPath $_
      }) -join ';'
    }; $i++ })

  # Maybe a notice
  $SadNotice = Get-Content -Path '.\src\assets\sad-notice.txt' | Out-String
  if ($SadNotice) { $SadNotice = 'NOTICE: ' + $SadNotice}

  # Map 'em
  $SadMap = @{
    notice = $SadNotice
    disclaimer = Get-Content -Path '.\src\assets\sad-disclaimer.txt' | Out-String
    acknowledgements = Get-Content -Path '.\src\assets\sad-acknowledgements.txt' | Out-String
    mtcbrrAbout = Get-Content -Path '.\src\assets\sad-mtcbrr-about.txt' | Out-String
    mtcbrrUpdates = Get-Content -Path '.\src\assets\sad-mtcbrr-updates.txt' | Out-String
    mtcbrrReferences = Get-Content -Path '.\src\assets\sad-mtcbrr-references.txt' | Out-String
    lovs = $SadLovArray
    mtcbrrs = $SadMtcbrrArray
    drafts = $SadMtcbrrDraftArray
  }
  $SadMapJson = ($SadMap | ConvertTo-Json)

  New-Item -Path '.\src\assets\sad-map.json' -ItemType 'file' -Value $SadMapJson -Force

  Write-Host $SadMapJson
}

main;