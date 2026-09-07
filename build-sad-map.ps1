function Get-NovelEntryArray {
  param (
    [string]$AssetsDirectory,  
    [string]$FileNameStartsWith,
    [string]$FileExtension,
    [int]$StartingId
  )
  $NovelFiles = Get-ChildItem -Path ".\src\assets\$AssetsDirectory" -Name "$FileNameStartsWith*$FileExtension" -File
  $NovelEntryArray = @($NovelFiles | ForEach-Object { $i = 0 } {
    @{
      id = $StartingId + $i
      title = [regex]::Matches($_, "$FileNameStartsWith_\d+_(.+)\$FileExtension").Groups[1].Value
      location = Join-Path -Path $AssetsDirectory -ChildPath $_.ToString()
    }; $i++ })
  $NovelEntryArray
}

function Add-ShortEntryMap($ShortMap, $ShortFile, $ShortFileRegex) {
    $ShortFileMatches = [regex]::Matches($ShortFile, $ShortFileRegex)
    $ShortTitle = $ShortFileMatches.Groups[1].Value
    $ShortValue = $ShortFileMatches.Groups[2].Value
    if(!$ShortMap.ContainsKey($ShortTitle)) {
      $ShortMap.Add($ShortTitle, [System.Collections.ArrayList]::new())
    }
    $ShortMap[$ShortTitle].Add($ShortValue)
}

function main {
  # Novels
  $SadYanArray = Get-NovelEntryArray -AssetsDirectory 'yans' -FileNameStartsWith 'yan' -FileExtension '.yan' -StartingId 0
  $SadMtcbrrArray = Get-NovelEntryArray -AssetsDirectory 'mtcbrrs' -FileNameStartsWith 'mtcbrr' -FileExtension '.mtcbrr' -StartingId 0
  $SadLilacArray = Get-NovelEntryArray -AssetsDirectory 'lilacs' -FileNameStartsWith 'lilac' -FileExtension '.lilac' -StartingId 0

  # Shorts
  $SadShortMap = @{}
  $SadShortFiles = Get-ChildItem -Path '.\src\assets\shorts' -Recurse -Include '*.short' -File  | % { $_.FullName } | Resolve-Path -Relative
  foreach($SadShortFile in $SadShortFiles) {
    Add-ShortEntryMap -ShortMap $SadShortMap -ShortFile $SadShortFile -ShortFileRegex '\.\\src\\assets\\shorts\\(\d+_-_\w+)\\(\w+\d+\.short)'
  }
  
  $SadShortArray = @($SadShortMap.GetEnumerator() | Sort-Object -Property Key -Descending | ForEach-Object { $i = 0 } {
    $Key = $_.Key
    @{
      id = $i
      title = $Key
      location = @($_.Value | ForEach-Object {
        Join-Path -Path (Join-Path -Path 'shorts' -ChildPath $Key) -ChildPath $_
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
    references = Get-Content -Path '.\src\assets\sad-references.txt' | Out-String
    yanAbout = Get-Content -Path '.\src\assets\yans\_about-yan.txt' | Out-String
    yanUpdates = Get-Content -Path '.\src\assets\yans\_updates-yan.txt' | Out-String
    mtcbrrAbout = Get-Content -Path '.\src\assets\mtcbrrs\_about-mtcbrr.txt' | Out-String
    mtcbrrUpdates = Get-Content -Path '.\src\assets\mtcbrrs\_updates-mtcbrr.txt' | Out-String
    lilacAbout = Get-Content -Path '.\src\assets\lilacs\_about-lilac.txt' | Out-String
    lilacUpdates = Get-Content -Path '.\src\assets\lilacs\_updates-lilac.txt' | Out-String
    linkInstagram = 'https://www.instagram.com/sensationanddesire'
    shorts = $SadShortArray
    yans = $SadYanArray
    mtcbrrs = $SadMtcbrrArray
    lilacs = $SadLilacArray
  }

  $CurrentTicks = (Get-Date).Ticks.ToString()
  $SadMapFile = ('sad-map-' + $CurrentTicks + '.json')

  Get-ChildItem -Path '.\src\assets\sad-map-*.json' | Remove-Item
  New-Item -Path ('.\src\assets\' + $SadMapFile) -ItemType 'file' -Value ($SadMap | ConvertTo-Json) -Force

  $SadConfigContent = Get-Content -Path '.\src\assets\sad-config.json' -Encoding UTF8
  $SadConfigContentModified = $SadConfigContent -ireplace 'sad-map-(\d+).json', ('sad-map-' + $CurrentTicks + '.json')
  Set-Content -Path '.\src\assets\sad-config.json' -Value $SadConfigContentModified -Encoding UTF8 -Force
}

main;